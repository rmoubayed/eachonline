import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppService } from '../../app.service';
import { Product } from '../../app.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  public quantity:number = 1;
  localAuthService: AuthService;
  
  constructor(public appService:AppService, private router:Router, private afs:AngularFirestore, public snackBar: MatSnackBar, private authService : AuthService) { }

  ngOnInit() {
    this.localAuthService = this.authService;
    this.authService.Data.cartList.forEach(cartProduct=>{
      this.authService.Data.wishList.forEach(product=>{
        if(cartProduct.objectID == product.objectID){
          product.cartCount = cartProduct.cartCount;
        }
      });
    });
  }

  public remove(product:Product) {
    const index: number = this.authService.Data.wishList.indexOf(product);
    if (index !== -1) {
      this.authService.Data.wishList.splice(index, 1);
      let document = this.afs.collection('cart').doc(`${this.authService.user['uid']}`)
      document.update({
        wishList: this.authService.Data.wishList
      })
    }     
  }

  public clear(){
    this.authService.Data.wishList.length = 0;
    let document = this.afs.collection('cart').doc(`${this.authService.user['uid']}`)
    document.update({
      wishList: this.authService.Data.wishList
    })
  } 

  // public getQuantity(val){
  //   console.log(val)
  //   this.quantity = val.soldQuantity;
  // }

  // public addToCart(product:Product){
  //   let currentProduct = this.authService.Data.cartList.filter(item=>item.id == product.id)[0];
  //   if(currentProduct){
  //     if((currentProduct.cartCount + this.quantity) <= product.availibilityCount){
  //       product.cartCount = currentProduct.cartCount + this.quantity;
  //     }
  //     else{
  //       this.snackBar.open('You can not add more items than available. In stock ' + product.availibilityCount + ' items and you already added ' + currentProduct.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
  //       return false;
  //     }
  //   }
  //   else{
  //     product.cartCount = this.quantity;
  //   }
  //   this.authService.addToCart(product);
  // } 

}
