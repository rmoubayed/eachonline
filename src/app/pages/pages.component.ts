import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, NavigationEnd, Data } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { AppService, User } from '../app.service';
import { Category, Product } from '../app.models';
import { SidenavMenuService } from '../theme/components/sidenav-menu/sidenav-menu.service';
import { AuthService } from '../services/auth.service';
import * as algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'X5I45PX5A1',
  'd344813a13a6a7918a0eefb1e1000666'
);

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [ SidenavMenuService ]
})
export class PagesComponent implements OnInit, AfterViewInit {
  public showBackToTop:boolean = false;
  public categories:any[]=[];
  public category:Category;
  public sidenavMenuItems:Array<any>;
  @ViewChild('sidenav') sidenav:any;
  public localAuthService:AuthService;
  config = {
    indexName: 'product',
    searchClient
  };
  public settings: Settings;
  public data : Data;
  public user : User;
  showSearchResults: boolean;
  localAppService: AppService;
  constructor(public appSettings:AppSettings, 
              public appService:AppService, 
              private afs:AngularFirestore,
              public authService: AuthService,
              public sidenavMenuService:SidenavMenuService,
              public router:Router) { 
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.localAppService = this.appService;
    this.data = this.authService.Data;
    this.user = this.authService.user;
    console.log(this.authService.Data, 'dataaa ')
    this.authService.db.collection('categories').get().then(
      (snapshot)=>{
        snapshot.forEach(
          (doc)=>{
            let data = doc.data()
            data.id = doc.id
            this.categories.push(data)
          }
        )

      }
    )
    // this.getCategories();
    this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
  } 
  
  toggleShowHits(value) {
    if(value) {
      this.appService.showSearchResults = value;
    }
  }

  keepSearchOpen(e: Event){
    e.stopPropagation();
  }



  // public getCategories(){    
  //   this.appService.getCategories().subscribe(data => {
  //     this.categories = data;
  //     this.category = data[0];
  //     this.authService.Data.categories = data;
  //   })
  // }

  viewProduct(product) {
    console.log(product, `products/${product.ID}`);
    this.router.navigate([`/products/${product.objectID}/${product.name}`])
  }

  search(){
    this.router.navigate([`/search/${(<HTMLInputElement>document.getElementsByClassName('ais-SearchBox-input')[0]).value}`,])
  }

  public changeCategory(event){
    if(event.target){
      this.category = this.categories.filter(category => category.name == event.target.innerText)[0];
    }
    if(window.innerWidth < 960){
      this.stopClickPropagate(event);
    } 
  }

  public remove(product) {
      const index: number = this.authService.Data.cartList.indexOf(product);
      if (index !== -1) {
          this.authService.Data.cartList.splice(index, 1);
          this.authService.Data.totalShipping = this.authService.Data.totalShipping - product.shipping*product.cartCount;
          this.authService.Data.totalPrice = this.authService.Data.totalPrice - product.newPrice*product.cartCount;
          this.authService.Data.totalCartCount = this.authService.Data.totalCartCount - product.cartCount;
          this.authService.resetProductCartCount(product);
          let document = this.afs.collection('cart').doc(`${this.authService.user['uid']}`)
          document.update({
            products: this.authService.Data.cartList,
            totalPrice: this.authService.Data.totalPrice,
            totalShipping: this.authService.Data.totalShipping,
            totalCartCount:this.authService.Data.totalCartCount
          })
      }        
  }

  public clear(){
    this.authService.Data.cartList.forEach(product=>{
      this.authService.resetProductCartCount(product);
    });
    this.authService.Data.cartList.length = 0;
    this.authService.Data.totalPrice = 0;
    this.authService.Data.totalShipping = 0;
    this.authService.Data.totalCartCount = 0;
    let document = this.afs.collection('cart').doc(`${this.authService.user['uid']}`)
    document.update({
      products: this.authService.Data.cartList,
      totalPrice: this.authService.Data.totalPrice,
      totalShipping: this.authService.Data.totalShipping,
      totalCartCount:this.authService.Data.totalCartCount
    })
  }
 

  public changeTheme(theme){
    this.settings.theme = theme;       
  }

  public stopClickPropagate(event: any){
    event.stopPropagation();
    event.preventDefault();
  }

 
  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval); 
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => { window.scrollTo(0,0) });
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;  
  }

  ngAfterViewInit(){    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        this.sidenav.close(); 
      }                
    });
    this.sidenavMenuService.expandActiveSubMenu(this.sidenavMenuService.getSidenavMenuItems());
  }

  public closeSubMenus(){
    if(window.innerWidth < 960){
      this.sidenavMenuService.closeAllSubMenus();
    }    
  }

}