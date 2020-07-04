import { AuthService } from './../../services/auth.service';
import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from "../../app.models";
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import * as algoliasearch from 'algoliasearch';
const searchClient = algoliasearch(
  'X5I45PX5A1',
  'd344813a13a6a7918a0eefb1e1000666'
);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public slides = [
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner5.jpg' }
  ];

  public brands = [];
  public banners = [];
  newProducts: any[]=[];
  saleProducts: any[]=[];
  featuredProducts: any[]=[];
  products: any[]=[];
  public config: SwiperConfigInterface = {};


  constructor(public appService:AppService, public authService: AuthService) { }

  ngOnInit() {
    this.searchCategory('featured', true)
    this.searchCategory('newArrival', true)
    this.searchDisount();
   
    // this.authService.db.collection('products').where("discount", ">", 0).limit(10).get().then(
    //   (snapshot)=>{
    //     snapshot.forEach((doc)=>{
    //       let data= doc.data();
    //       data.id = doc.id;
    //       if(data.status == 'published'){
    //         this.saleProducts.push(data);
    //       }
    //     })
    //   }
    // ).finally(
    //   ()=>{
    //     console.log(this.saleProducts)
    //   }
    // )
    // this.authService.db.collection('products').where('featured', '==', true).limit(10).get().then(
    //   (snapshot)=>{
    //     snapshot.forEach((doc)=>{
    //       let data= doc.data();
    //       data.id = doc.id;
    //       // if(data.status == 'published'){
    //         this.featuredProducts.push(data);
    //       // }
    //     })
    //   }
    // ).finally(
    //   ()=>{
    //     this.products = this.featuredProducts;
    //     console.log(this.featuredProducts)
    //   }
    // )
    // this.authService.db.collection('products').where('newArrival', '==', true).limit(10).get().then(
    //   (snapshot)=>{
    //     snapshot.forEach((doc)=>{
    //       console.log(doc, 'new')
    //       let data= doc.data();
    //       data.id = doc.id;
    //       if(data.status == 'published'){
    //         this.newProducts.push(data);
    //       }
    //     })
    //   }
    // ).finally(
    //   ()=>{
    //     console.log(this.newProducts)
    //   }
    // )
  }

  ngAfterViewInit() {
    this.config = {
      slidesPerView: 4,
      spaceBetween: 16,       
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,        
      loop: false,
      watchOverflow: true,
      preloadImages: true,
      lazy: true,  
    }
    

  }

  public onLinkClick(e){
    console.log(e)
    if(e.tab.textLabel.toLowerCase() == 'on sale'){
      this.searchDisount();
      
    }else if(e.tab.textLabel.toLowerCase() == 'featured'){
      this.searchCategory('featured', true)
      
    }else if(e.tab.textLabel.toLowerCase() == 'new arrivals'){
      this.searchCategory('newArrival', true)
      
    }
  }

  searchCategory(facet,value):any {
    searchClient.search(
      [
        {
          indexName: 'product', 
          query: '',
          params: {
            facetFilters: [facet+':'+value, 'status:published'] ,
          }
        }
      ]).then((data)=>{
        console.log(data)
        this.products = data.results[0].hits;
        if(facet == 'featured')  this.featuredProducts = data.results[0].hits;
        else if (facet == 'newArrival') this.newProducts = data.results[0].hits;
      })
  }

  searchDisount(){
    searchClient.search(
      [
        {
          indexName: 'product',
          query:'',
          params:{
            filters: `discount > 0`
          }
        }
      ]
    ).then(
      (data)=>{
        this.saleProducts = data.results[0].hits;
      }
    )
  }

  public getBanners(){
    this.appService.getBanners().subscribe(data=>{
      this.banners = data;
    })
  }

  public getBrands(){
    this.brands = this.appService.getBrands();
  }

  @HostListener("window:resize", [])
  onWindowResize() {
    if(document.documentElement.clientWidth <= 480){
      this.config.slidesPerView =  1;
    }else if(document.documentElement.clientWidth <= 740){
      this.config.slidesPerView =  2;
    }else{
      this.config.slidesPerView = 3;
    }
  }

}
