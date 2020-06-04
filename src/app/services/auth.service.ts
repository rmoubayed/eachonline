import { AppService } from './../app.service';
import { User } from '../app.service';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Subject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router} from '@angular/router';
import * as firebase from 'firebase';
import { Category, Product } from '../app.models';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
export interface Data {
  categories: Category[];
  compareList: Product[];
  wishList: Product[];
  cartList: Product[];
  totalPrice: number;
  totalCartCount: number;
}
@Injectable({
    providedIn:'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, public appService:AppService, private afs: AngularFirestore, public formBuilder: FormBuilder, public router:Router, public http:HttpClient, public snackBar: MatSnackBar) { }
  loggedIn : boolean;
  user : User
  db = firebase.firestore();
  Data :  Data = {
    categories: [], // categories
    compareList:[], // compareList
    wishList: [],  // wishList
    cartList: [],  // cartList
    totalPrice: null, //totalPrice,
    totalCartCount: 0 //totalCartCount
  }
  
  register(values) {
    this.afAuth.auth.createUserWithEmailAndPassword(values['email'], values['password']).then(
      (data)=>{
        console.log(data);
        this.afs.doc(`cart/${data.user.uid}`).set({ }, { merge: true });
        this.afs.doc(`customer/${data.user.uid}`).set({ }, { merge: true });
        return this.afs.doc(`customer/${data.user.uid}`).update({
          email: data.user.email,
          fullName: values['name']
        }).then(
          ()=>{ 
            this.loggedIn = true;
            this.user = data.user;
            data.user.updateProfile({displayName: values['name']}).then(
              (data)=>{
                console.log('updateProfile', data);
                this.sendEmailVerify();
                this.router.navigate(['/']);
              }
            )
          }
        ).catch( (error) => {
            console.log(error);
        });
      })
  }
  login(values) {
    console.log(values, 'values on login')
    this.afAuth.auth.signInWithEmailAndPassword(values['email'], values['password']).then(
      (data)=>{
        console.log(data);
        this.user = data.user;
        this.loggedIn = true;
      },(e)=>{
        console.log('err',e);
        if(e['code'] && e['message']) {
        }
      }
    )
  }
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.router.navigate(['/'])
      })
    })
  }
  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
 }
  logout() {
    this.afAuth.auth.signOut().then(
      (data)=>{
        console.log(data);
        this.loggedIn = false;
        this.user = null;
        this.Data = {
          categories: [], 
          compareList:[], 
          wishList: [],  
          cartList: [],  
          totalPrice: null, 
          totalCartCount: 0 
        }
        this.router.navigate(['/']);
      }
    )
  }
  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.loggedIn = true;
          this.user = user;
          // firebase.f
          console.log('USER', user);
          
          this.db.collection('customer').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
              let user = doc.data()
              this.user['billingAddress'] = user.billingAddress ? user.billingAddress : {}
              this.user['shippingAddress'] = user.shippingAddress ? user.shippingAddress : {}
              this.user['paymentMethod'] = user.paymentMethod ? user.paymentMethod : {}
              this.user['deliveryMethod'] = user.deliveryMethod ? user.deliveryMethod : {}
                console.log("Document data:", doc.data()); 
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            reject(error);
        });
          resolve(user);
        } else {
          this.loggedIn = false;
          reject();
        }
      })
    })
  }

public addToCompare(product:Product){
    let message, status;
    if(this.Data.compareList.filter(item=>item.id == product.id)[0]){
        message = 'The product ' + product.name + ' already added to comparison list.'; 
        status = 'error';     
    }
    else{
        this.Data.compareList.push(product);
        message = 'The product ' + product.name + ' has been added to comparison list.'; 
        status = 'success';  
    }
    let document = this.afs.collection('cart').doc(`${this.user['uid']}`)
    document.get().toPromise().then(
        (docSnapshot) => {
            if (docSnapshot.exists) {
              document.update({
                compareList: this.Data.compareList
            })
            } else {
              document.set({
                compareList: this.Data.compareList
              }, { merge: true }) 
            }
        });
    this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
}

public addToWishList(product:Product){
    let message, status;
    if(this.Data.wishList.filter(item=>item.id == product.id)[0]){
        message = 'The product ' + product.name + ' already added to wish list.'; 
        status = 'error';     
    }else{
        this.Data.wishList.push(product);
        message = 'The product ' + product.name + ' has been added to wish list.'; 
        status = 'success';  
    }
    let document = this.afs.collection('cart').doc(`${this.user['uid']}`)
    document.get().toPromise().then(
        (docSnapshot) => {
            if (docSnapshot.exists) {
              document.update({
                wishList: this.Data.wishList
            })
            } else {
              document.set({
                wishList: this.Data.wishList
              }, { merge: true }) 
            }
        });
    this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
}


public addToCart(product:Product){
  let message, status;        
  this.Data.totalPrice = null;
  this.Data.totalCartCount = null;
  if(this.Data.cartList.filter(item=>item.id == product.id)[0]){ 
    let item = this.Data.cartList.filter(item=>item.id == product.id)[0];
    item.cartCount = product.cartCount;
    item['items'] = product['items']
  }else{           
    this.Data.cartList.push(product);
  }        
  this.Data.cartList.forEach(product=>{
    this.Data.totalPrice = this.Data.totalPrice + (product.cartCount * product.newPrice);
    this.Data.totalCartCount = this.Data.totalCartCount + product.cartCount;
  });
  console.log(product, 'right befor databse function')
  let document = this.afs.collection('cart').doc(`${this.user['uid']}`)
  document.get().toPromise().then(
    (docSnapshot) => {
      if(docSnapshot.exists){
        document.update({
          products: this.Data.cartList,
          totalPrice: this.Data.totalPrice,
          totalCartCount: this.Data.totalCartCount
        })
      }else{
        document.set({
          products: this.Data.cartList,
          totalPrice: this.Data.totalPrice,
          totalCartCount: this.Data.totalCartCount
        }, { merge: true }) 
      }
    });
  message = 'The product ' + product.name + ' has been added to cart.'; 
  status = 'success';          
  this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
}


public resetProductCartCount(product:Product){
    product.cartCount = 0;
    let compareProduct = this.Data.compareList.filter(item=>item.id == product.id)[0];
    if(compareProduct){
        compareProduct.cartCount = 0;
        this.afs.collection('cart').doc(this.user['uid']).update({
          compareList: this.Data.compareList
        })
    };
    let wishProduct = this.Data.wishList.filter(item=>item.id == product.id)[0];
    if(wishProduct){
        wishProduct.cartCount = 0;
        this.afs.collection('cart').doc(this.user['uid']).update({
          wishList: this.Data.wishList
        })
    }; 
}
  getCart(){
    return new Promise<any>((resolve, reject)=>{
      this.db.collection('cart').doc(this.user['uid']).get().then((doc)=>{
        if(doc.exists){
            let docData = doc.data();
            console.log(docData, 'cart data');
            this.Data.cartList = docData.products ? docData.products : [];
            this.Data.wishList = docData.wishList ? docData.wishList : [];
            this.Data.compareList = docData.compareList ? docData.compareList : [];
            this.Data.totalCartCount = docData.totalCartCount ? docData.totalCartCount : 0;
            this.Data.totalPrice = docData.totalPrice ? docData.totalPrice : 0;
            console.log(this.user)
        }
        resolve(true)
    }).catch(
      (error)=> {
        console.log('cat fail', error);
        reject(error)
      }
    )
  })
}
  
  updateProfileName(name){
    console.log(name)
    var user = firebase.auth().currentUser;
    user.updateProfile({displayName: name}).then(
      ()=> {
        console.log('UPDATED PROFILE NAME');
        firebase.auth().currentUser.reload()
        this.afs.collection('customer').doc(this.user['uid']).update({
          fullName:name
        })
      }).catch(
        (e)=>{
          this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          console.log(e); 
      }).finally(
        ()=>{
          this.snackBar.open('Your name has been updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        }
      )
  }
  updateUserEmail(email) {
    var user = firebase.auth().currentUser;
    user.updateEmail(email).then(
      ()=>{
        this.sendEmailVerify();
        this.afs.collection('customer').doc(this.user['uid']).update({
          email:email
        })
      }).catch(
        (e)=>{
          this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          console.log(e);
      }).finally(
        ()=>{
          this.snackBar.open('Your email has been updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        }
      )
  }
  
  resetUserPassword(newPassword) {
    var user = firebase.auth().currentUser;
    user.updatePassword(newPassword).then(function() {
      this.snackBar.open('Your password has been updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });        
    }).catch(function(error) {
        this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    });
  }

  sendEmailVerify() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(
      ()=>{

      }).catch(
        (error)=>{
          console.log(error)
        }
      );
  }
//   getCategories() {
//     let cats = [];
//     let subcats = [];
//     return new Promise<any>((resolve, reject) => {
//       this.db.collection('categories').get().then(
//       (querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           // console.log(doc.id, " => ", doc.data());
//           cats.push(doc.data());
//         });
//         this.db.collection('subcategories').get().then(
//           (querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//               // console.log(doc.id, " => ", doc.data());
//               subcats.push(doc.data());
//             });
//             this.categories = cats;
//             this.subcategories = subcats;
//             resolve(true);
//             console.log(this.categories, this.subcategories);
//           }
//         ).catch(
//           (error)=>{
//             console.log('subcat fail', error);
//             reject(error)
//           }
//         )
//       }
//     ).catch(
//       (error)=> {
//         console.log('cat fail', error);
//         reject(error)
//       }
//     )
//     })
//   }
  
}
