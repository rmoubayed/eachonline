import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product } from "../../app.models";

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss']
})
export class ProductsCarouselComponent implements OnInit {
  
  @Input('products') products: Array<Product> = [];
  @Input('type') type: string;
  public config: SwiperConfigInterface = {};
  saleProducts: Product[];
  newProducts: Product[];
  featuredProducts: Product[];
  constructor(public appService:AppService, public dialog: MatDialog, private router: Router, public authService : AuthService) { }

  ngOnInit() {
    if(this.type == 'sale'){
      this.saleProducts = this.products;
    }else if (this.type == 'new'){
      this.newProducts = this.products;
    }else if (this.type == 'featured'){
      this.featuredProducts = this.products;
    }
    
   }
  
  ngAfterViewInit(){
    console.log(this.products)
    
  }

  public openProductDialog(product){   
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.objectID, product.name]); 
      }
    });
  }

}