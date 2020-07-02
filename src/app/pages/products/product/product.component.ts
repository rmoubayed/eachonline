import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { AppService } from '../../../app.service';
import { Product } from "../../../app.models";
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { AuthService } from '../../../services/auth.service';
import * as algoliasearch from 'algoliasearch';

const searchClient = algoliasearch(
  'X5I45PX5A1',
  'd344813a13a6a7918a0eefb1e1000666'
);
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('zoomViewer') zoomViewer;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface={};
  public product: Product;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: FormGroup;
  public relatedProducts: Array<Product> = [];
  selectedColor: string;
  selectedSize: string;
  productId: string;

  constructor(public appService:AppService, private route: Router, public authService : AuthService, private activatedRoute: ActivatedRoute, public dialog: MatDialog, public formBuilder: FormBuilder) {  }

  ngOnInit() {      
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.search('objectID',this.productId)
    // this.getRelatedProducts();    
  }

  search(facet, value):any {
    searchClient.search(
      [
        {
          indexName: 'product', 
          query: '',
          params: {facetFilters: [facet + ':' +value] }
        }
      ]).then((data)=>{
        
        if(facet == 'objectID'){
          this.product = data.results[0].hits[0];
          this.image = this.product.images[0];
          this.search('categoryLabel', this.product.categoryLabel)
        }
        else{
          this.relatedProducts = data.results[0].hits.filter((hit)=>{return hit.status == 'published' && hit.objectID != this.productId});
          console.log(this.relatedProducts, 'related products')
        }
        console.log(data)
      }).finally(
        ()=>{
        }
      )
  }

  ngAfterViewInit(){
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,      
      keyboard: true,
      navigation: true,
      pagination: false,       
      loop: false, 
      preloadImages: false,
      lazy: true, 
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    }
  }

  

  public selectImage(image){
    console.log(image)
    this.image = image;
    this.zoomImage = image;
  }

  public onMouseMove(e){
    if(window.innerWidth >= 1280){
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget; 
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX/image.offsetWidth*100;
      y = offsetY/image.offsetHeight*100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if(zoomer){
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event){
    if(this.zoomViewer.nativeElement.children[0]){
      this.zoomViewer.nativeElement.children[0].style.display = "none";      
    }
  }

  public openZoomViewer(){
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  public selectSize(size:string){
    this.selectedSize = size;
    console.log(size)
    console.log(this.product)
    if(this.product['item']){
      this.product['item']['selectedSize'] = size
    }else{
      this.product['item']={}
      this.product['item']['selectedSize'] = size
    }
    // this.product['selectedSize'] = [size]
    // if(this.product['selectedSize']){
    //   if(this.product['selectedSize'].indexOf(size) > -1){
    //     this.product['selectedSize'].splice(this.product['selectedSize'].indexOf(size))
    //   }else{
    //     this.product['selectedSize']=[size]
    //   }
    // }else{
    //   this.product['selectedSize'] = [size]
    // }
    // if(document.getElementById(size).classList.contains('selected')){
    //   document.getElementById(size).classList.remove('selected')
    // }else{
    //   document.getElementById(size).classList.add('selected')
    // }
    console.log(this.product)
  }

  public selectColor(color:string){
    this.selectedColor = color;
    console.log(color, this.product)
    if(this.product['item']){
      this.product['item']['selectedColor'] = color
    }else{
      this.product['item']={}
      this.product['item']['selectedColor'] = color
    }
    
    // if(this.product['selectedColor']){
    //   if(this.product['selectedColor'].indexOf(color) > -1){
    //     this.product['selectedColor'].splice(this.product['selectedColor'].indexOf(color))
    //   }else{
    //     this.product['selectedColor']=[color]
    //   }
    // }else{
    //   this.product['selectedColor'] = [color]
    // }
    // if(document.getElementById(color).classList.contains('selected')){
    //   document.getElementById(color).classList.remove('selected')
    // }else{
    //   document.getElementById(color).classList.add('selected')
    // }
  }


  public onSubmit(values:Object):void {
    if (this.form.valid) {
      //email sent
    }
  }
}