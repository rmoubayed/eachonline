import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {AppService } from '../../app.service';
import { Product } from '../../app.models';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  
  constructor(public appService:AppService, private afs:AngularFirestore, public snackBar: MatSnackBar, private authService : AuthService) { }

  ngOnInit() { 
    this.authService.Data.cartList.forEach(cartProduct=>{
      this.authService.Data.compareList.forEach(product=>{
        if(cartProduct.objectID == product.objectID){
          product.cartCount = cartProduct.cartCount;
        }
      });
    });
  }

  public remove(product:Product) {
      const index: number = this.authService.Data.compareList.indexOf(product);
      if (index !== -1) {
          this.authService.Data.compareList.splice(index, 1);
          let document = this.afs.collection('cart').doc(`${this.authService.user['uid']}`)
          document.update({
            compareList: this.authService.Data.compareList
          })
      }        
  }

  public clear(){
    this.authService.Data.compareList.length = 0;
    let document = this.afs.collection('cart').doc(`${this.authService.user['uid']}`)
    document.update({
      compareList: this.authService.Data.compareList
    })
  }

  // public addToCart(product:Product){
  //   product.cartCount = product.cartCount + 1;
  //   if(product.cartCount <= product.availibilityCount){
  //     this.authService.addToCart(product);
  //   }
  //   else{
  //     product.cartCount = product.availibilityCount;
  //     this.snackBar.open('You can not add more items than available. In stock ' + product.availibilityCount + ' items and you already added ' + product.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
  //   }
  // }

}
