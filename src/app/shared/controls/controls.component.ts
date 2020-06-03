import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Product } from '../../app.models';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(public authService:AuthService, public snackBar: MatSnackBar) { }

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
    if(this.type == 'all' || this.type == 'quick-view'){
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
    this.authService.addToCompare(product);
  }

  public addToWishList(product:Product){
    this.authService.addToWishList(product);
  }

  public addToCart(product:Product){
    console.log(product)
    
    let message;
    let status;
    let currentProduct = this.authService.Data.cartList.filter(item=>item.id == product.id)[0];
    if(currentProduct){
      if((currentProduct.cartCount + this.count) <= this.product.availibilityCount){
        product.cartCount = currentProduct.cartCount + this.count;
        if(product['selectedSize'] && product['selectedColor'] ){
          if(this.count > 1){
            let size = product['selectedSize'][0];
            let color = product['selectedColor'][0]
            for(let i=0 ; i < this.count - 1; i++){
              product['selectedSize'].push(size);
              product['selectedColor'].push(color);
            }
            console.log(product)
          }
          product['selectedSize'] = product['selectedSize'].concat(currentProduct['selectedSize'])
          product['selectedColor'] = product['selectedColor'].concat(currentProduct['selectedColor'])
          this.authService.addToCart(product)
        }else{
          message = 'Please select size and color in order to add to cart'; 
          status = 'success';          
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
        }
      }else{
        this.snackBar.open('You can not add more items than available. In stock ' + this.product.availibilityCount + ' items and you already added ' + currentProduct.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        return false;
      }
    }else{
      product.cartCount = this.count;
      if(product['selectedSize'] && product['selectedColor']){
        this.authService.addToCart(product);
      }else{
        message = 'Please select size and color in order to add to cart'; 
        status = 'success';          
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      }
    }
  }

  public openProductDialog(event){
    this.onOpenProductDialog.emit(event);
  }

  public changeQuantity(value){
    this.onQuantityChange.emit(value);
  }

}