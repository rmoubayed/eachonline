import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  shipping = [];
  shippingTotal = 0;
  cartItemCount = [];
  cartItemCountTotal = 0;
  localAuthService: AuthService;
  constructor(public appService:AppService,private afs: AngularFirestore, private authService : AuthService) { }

  ngOnInit() {
    this.localAuthService = this.authService;
    this.authService.Data.cartList.forEach(product=>{
      console.log(product, 'productttt')
      this.shipping[product.objectID] = product.cartCount*product.shipping;
      this.shippingTotal += product.cartCount*product.shipping;
      this.total[product.objectID] = product.cartCount*product.newPrice;
      this.grandTotal += product.cartCount*product.newPrice;
      this.cartItemCount[product.objectID] = product.cartCount;
      this.cartItemCountTotal += product.cartCount;

      console.log(this.total, this.grandTotal, this.cartItemCount, this.cartItemCountTotal)
    })
    console.log(this.authService.Data)
    
  }

  // public updateCart(value){
  //   console.log(value)
  //   if(value){

  //     this.total[value.productId] = value.total;
  //     this.cartItemCount[value.productId] = value.soldQuantity;
  //     this.grandTotal = 0;
  //     this.total.forEach(price=>{
  //       this.grandTotal += price;
  //     });
  //     this.cartItemCountTotal = 0;
  //     this.cartItemCount.forEach(count=>{
  //       this.cartItemCountTotal +=count;
  //     });
     
  //     this.authService.Data.totalPrice = this.grandTotal;
  //     this.authService.Data.totalCartCount = this.cartItemCountTotal;

  //     this.authService.Data.cartList.forEach(product=>{
  //       this.cartItemCount.forEach((count,index)=>{
  //         if(product.id == index){
  //           product.cartCount = count;
  //         }
  //         if(product.id == value.productId){
  //           console.log(product['selectedSize'], product['selectedColor'])
  //           let size = product['selectedSize'][0]
  //           let color = product['selectedColor'][0]
  //           console.log(size, color)
  //           product['selectedSize'].push(size)
  //           product['selectedColor'].push(color)
  //           console.log(product, 'product after push size annd colorrr')

  //         }
  //       });
  //     });
  //     let document = this.afs.collection('cart').doc(`${this.authService.user['uid']}`)
  //     document.update({
  //       products: this.authService.Data.cartList,
  //       totalPrice: this.authService.Data.totalPrice,
  //       totalCartCount: this.authService.Data.totalCartCount
  //     })
  //   }
  // }

  public remove(product) {
    const index: number = this.authService.Data.cartList.indexOf(product);
    if (index !== -1) {
      this.authService.Data.cartList.splice(index, 1);
      this.grandTotal = this.grandTotal - this.total[product.objectID]; 
      this.shippingTotal = this.shippingTotal - this.shipping[product.objectID];
      this.authService.Data.totalPrice = this.grandTotal;       
      this.authService.Data.totalShipping = this.shippingTotal;
      this.total.forEach(val => {
        if(val == this.total[product.objectID]){
          this.total[product.objectID] = 0;
        }
      });
      this.shipping.forEach(val => {
        if(val == this.shipping[product.objectID]){
          this.shipping[product.objectID] = 0;
        }
      });

      this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[product.objectID]; 
      this.authService.Data.totalCartCount = this.cartItemCountTotal;
      this.cartItemCount.forEach(val=>{
        if(val == this.cartItemCount[product.objectID]){
          this.cartItemCount[product.objectID] = 0;
        }
      });
      this.afs.collection('cart').doc(this.authService.user['uid']).update({
        products: this.authService.Data.cartList,
        totalPrice:this.authService.Data.totalPrice,
        totalShipping: this.authService.Data.totalShipping,
        totalCartCount:this.authService.Data.totalCartCount
      })
      this.authService.resetProductCartCount(product);
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
    this.afs.collection('cart').doc(this.authService.user['uid']).update({
      products: this.authService.Data.cartList,
      totalPrice:this.authService.Data.totalPrice,
      totalShipping: this.authService.Data.totalShipping,
      totalCartCount:this.authService.Data.totalCartCount
    })
  } 

}
