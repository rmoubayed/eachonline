import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Product } from '../../app.models';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Input() product: Product;
  @Input() type: string;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() onQuantityChange: EventEmitter<any> = new EventEmitter<any>();
  public count:number = 1;
  public align = 'center center';
  constructor(public authService:AuthService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.type)
    if(this.product){
      if(this.product.cartCount > 0){
        this.count = this.product.cartCount;
      }
    }  
    this.layoutAlign(); 
  }

  public layoutAlign(){
    if(this.type == 'all' || this.type == 'quick-view' || this.type == 'details'){
      this.align = 'space-between center';
    }
    else if(this.type == 'wish'){
      this.align = 'start center';
    }
    else{
      this.align = 'center center';
    }
  }



  public increment(count){
    if(this.count < this.product.availibilityCount){
      this.count++;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.newPrice
      }
      this.changeQuantity(obj);
    }
    else{
      this.snackBar.open('You can not choose more items than available. In stock ' + this.count + ' items.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }    
  }

  public decrement(count){
    if(this.count > 1){
      this.count--;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.newPrice
      }
      this.changeQuantity(obj);
    }
  }

  public addToCompare(product:Product){
    if(this.authService.loggedIn){
      this.authService.addToCompare(product);
    }else{
      this.router.navigate(['/sign-in'])
    }
    
  }

  public addToWishList(product:Product){
    if(this.authService.loggedIn){
      this.authService.addToWishList(product);
    }else{
      this.router.navigate(['/sign-in'])
    }
  }

  public addToCart(product:Product){
    if(this.authService.loggedIn){
      console.log(product)
      let message;
      let status;
      let currentProduct = this.authService.Data.cartList.filter(item=>item.id == product.id)[0];
      if(currentProduct){
        if((currentProduct.cartCount + this.count) <= this.product.availibilityCount){
          product.cartCount = currentProduct.cartCount + this.count;
          console.log(product.size.length)
          if((product.size != null && !(product['item'] && product['item']['selectedSize'])) && (product.color != null && !(product['item'] && product['item']['selectedColor']))){
            message = 'Please select size or color in order to add to cart'; 
            status = 'error';          
            this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
          }else if(product.size == null && product.color == null){
            this.authService.addToCart(product)
          }else{
            product['item']['Qty'] = this.count;
            this.product['items'].push(this.product['item'])
            delete this.product['item']
            console.log(product, 'product right before add to cart')
            this.authService.addToCart(product)
          }
        }else{
          this.snackBar.open('You can not add more items than available. In stock ' + this.product.availibilityCount + ' items and you already added ' + currentProduct.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
          return false;
        }
      }else{
        product.cartCount = this.count;
        if((product.size != null && !(product['item'] && product['item']['selectedSize'])) && (product.color != null && !(product['item'] && product['item']['selectedColor']))){
          message = 'Please select size and color in order to add to cart'; 
          status = 'error';          
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 }); 
        }else if(product.size == null && product.color == null){
          this.authService.addToCart(product);
        }else{
          product['item']['Qty'] = this.count;
          if(this.product['items']){
            this.product['items'].push(this.product['item'])
          }else{
            this.product['items'] = [this.product['item']];
          }
          delete this.product['item']
          console.log(product, 'product right before add to cart')
          this.authService.addToCart(product);
        }
      }
    }else{
      this.router.navigate(['/sign-in'])
    }
    
  }

  public openProductDialog(event){
    this.onOpenProductDialog.emit(event);
  }

  public changeQuantity(value){
    this.onQuantityChange.emit(value);
  }

}