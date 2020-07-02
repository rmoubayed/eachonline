import { AuthService } from './../../services/auth.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from "../../app.models";
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
    
    this.config = {
      observer: true,
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
    this.authService.db.collection('products').where("discount", ">", 0).get().then(
      (snapshot)=>{
        snapshot.forEach((doc)=>{
          let data= doc.data();
          data.id = doc.id;
          if(data.status == 'published'){
            this.saleProducts.push(data);
          }
        })
      }
    ).finally(
      ()=>{
        console.log(this.saleProducts)
      }
    )
    this.authService.db.collection('products').where('featured', '==', 'yes').get().then(
      (snapshot)=>{
        snapshot.forEach((doc)=>{
          let data= doc.data();
          data.id = doc.id;
          if(data.status == 'published'){
            this.featuredProducts.push(data);
          }
        })
      }
    ).finally(
      ()=>{
        this.products = this.featuredProducts;
        console.log(this.featuredProducts)
      }
    )
    this.authService.db.collection('products').where('newArrival', '==', 'yes').get().then(
      (snapshot)=>{
        snapshot.forEach((doc)=>{
          console.log(doc, 'new')
          let data= doc.data();
          data.id = doc.id;
          if(data.status == 'published'){
            this.newProducts.push(data);
          }
        })
      }
    ).finally(
      ()=>{
        console.log(this.newProducts)
      }
    )
  }

  public onLinkClick(e){
    console.log(e)
    if(e.tab.textLabel.toLowerCase() == 'on sale'){
      
      
    }else if(e.tab.textLabel.toLowerCase() == 'featured'){
      
      
    }else if(e.tab.textLabel.toLowerCase() == 'New Arrivals'){
      
      
    }
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
