import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  cartItemCount = [];
  cartItemCountTotal = 0;
  constructor(public appService:AppService, private authService : AuthService) { }

  ngOnInit() {
    this.authService.Data.cartList.forEach(product=>{
      this.total[product.id] = product.cartCount*product.newPrice;
      this.grandTotal += product.cartCount*product.newPrice;
      this.cartItemCount[product.id] = product.cartCount;
      this.cartItemCountTotal += product.cartCount;
    })
  }

  public updateCart(value){
    if(value){
      this.total[value.productId] = value.total;
      this.cartItemCount[value.productId] = value.soldQuantity;
      this.grandTotal = 0;
      this.total.forEach(price=>{
        this.grandTotal += price;
      });
      this.cartItemCountTotal = 0;
      this.cartItemCount.forEach(count=>{
        this.cartItemCountTotal +=count;
      });
     
      this.authService.Data.totalPrice = this.grandTotal;
      this.authService.Data.totalCartCount = this.cartItemCountTotal;

      this.authService.Data.cartList.forEach(product=>{
        this.cartItemCount.forEach((count,index)=>{
          if(product.id == index){
            product.cartCount = count;
          }
        });
      });
      
    }
  }

  public remove(product) {
    const index: number = this.authService.Data.cartList.indexOf(product);
    if (index !== -1) {
      this.authService.Data.cartList.splice(index, 1);
      this.grandTotal = this.grandTotal - this.total[product.id]; 
      this.authService.Data.totalPrice = this.grandTotal;       
      this.total.forEach(val => {
        if(val == this.total[product.id]){
          this.total[product.id] = 0;
        }
      });

      this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[product.id]; 
      this.authService.Data.totalCartCount = this.cartItemCountTotal;
      this.cartItemCount.forEach(val=>{
        if(val == this.cartItemCount[product.id]){
          this.cartItemCount[product.id] = 0;
        }
      });
      this.authService.resetProductCartCount(product);
    }     
  }

  public clear(){
    this.authService.Data.cartList.forEach(product=>{
      this.authService.resetProductCartCount(product);
    });
    this.authService.Data.cartList.length = 0;
    this.authService.Data.totalPrice = 0;
    this.authService.Data.totalCartCount = 0;
  } 

}
