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
  totalShipping: number
}
@Injectable({
    providedIn:'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, public appService:AppService, private afs: AngularFirestore, public formBuilder: FormBuilder, public router:Router, public http:HttpClient, public snackBar: MatSnackBar) { }
  loggedIn : boolean;
  user : User
  db = firebase.firestore();
  apiUrl: string = 'https://us-central1-eachonline-dev.cloudfunctions.net/gateway/';
  Data :  Data = {
    categories: [], // categories
    compareList:[], // compareList
    wishList: [],  // wishList
    cartList: [],  // cartList
    totalPrice: null, //totalPrice,
    totalCartCount: 0, //totalCartCount
    totalShipping:0
  }
  
  register(values) {
    console.log('register')
    this.afAuth.auth.createUserWithEmailAndPassword(values['email'], values['password']).then(
      (data)=>{
        console.log(data);
        data.user.updateProfile({displayName: values['name']})
        this.afs.doc(`cart/${data.user.uid}`).set({ }, { merge: true });
        this.afs.doc(`customer/${data.user.uid}`).set({
          email: data.user.email,
          fullName: values['name'],
          userType:'customer'
        }).then(
          ()=>{ 
            this.loggedIn = true;
            this.user = data.user;
            this.sendEmailVerify();
            this.snackBar.open('You registered successfully! an email verification has been sent to you', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            this.router.navigate(['/']);
          }
        ).catch( (error) => {
          console.log(error)
            // let err = JSON.parse(error)
          this.snackBar.open(error.message, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

        });
      }).catch(error=>{
        console.log(error)
        this.snackBar.open(error.message, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      })
  }
  login(values) {
    console.log(values, 'values on login')
    let message, status;
    this.afAuth.auth.signInWithEmailAndPassword(values['email'], values['password']).then(
      (data)=>{
        console.log(data);
        this.user = data.user;
        this.loggedIn = true;
        this.router.navigate(['/']);
      },(e)=>{
        console.log('err',e);
        if(e['code'] && e['message']) {
          message = e['message']
          status='error';
          console.log(message,'erro mesgggg')
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
        }
      }
    ).catch(
      (e)=>{
        console.log(e)
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
        console.log(res)
        if(res.additionalUserInfo.isNewUser){
          this.afs.doc(`cart/${res.user.uid}`).set({ }, { merge: true });
            this.afs.doc(`customer/${res.user.uid}`).set({
              email: res.user.email,
              fullName: res.user.displayName,
              userType:'customer'
            }).then(
              ()=>{ 
                this.loggedIn = true;
                this.user = res.user;
                this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                this.router.navigate(['/']);
              }
            ).catch( (error) => {
              console.log(error)
                // let err = JSON.parse(error)
              this.snackBar.open(error.message, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    
            });          
        }else{
          console.log('kjhgfghjh')
          this.router.navigate(['/']);
        } 
        resolve(res);
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
          totalShipping:0,
          totalPrice: null, 
          totalCartCount: 0 
        }
        this.router.navigate(['/']);
      }
    )
  }
  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = this.afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          this.loggedIn = true;
          this.user = user;
          // firebase.f
          console.log('USER', user);
          
          this.db.collection('customer').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
              let user = doc.data()
              this.user['billingAddress'] = user.billingAddress ? user.billingAddress : undefined
              this.user['shippingAddress'] = user.shippingAddress ? user.shippingAddress : undefined
              this.user['paymentMethod'] = user.paymentMethod ? user.paymentMethod : undefined
              this.user['deliveryMethod'] = user.deliveryMethod ? user.deliveryMethod : undefined
              this.user['userType']= user.userType
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
    if(this.Data.compareList.filter(item=>item.objectID == product.objectID)[0]){
        message = 'The product ' + product.name + ' already added to comparison list.'; 
        status = 'error';     
    }
    else{
      if(this.Data.compareList && this.Data.compareList.length < 5){
        this.Data.compareList.push(product);
        message = 'The product ' + product.name + ' has been added to comparison list.'; 
        status = 'success';  
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
      }else{
        message = 'You cannot compare more than 5 items'; 
        status = 'error';  
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
      }
        
    }
   
}

public addToWishList(product:Product){
    let message, status;
    if(this.Data.wishList.filter(item=>item.objectID == product.objectID)[0]){
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
  this.Data.totalShipping = null;
  this.Data.totalCartCount = null;
  if(this.Data.cartList.filter(item=>item.objectID == product.objectID)[0]){ 
    let item = this.Data.cartList.filter(item=>item.objectID == product.objectID)[0];
    item.cartCount = product.cartCount;
    if(product['items']){
      item['items'] = product['items']
    }
  }else{           
    this.Data.cartList.push(product);
  }        
  this.Data.cartList.forEach(product=>{
    this.Data.totalPrice = this.Data.totalPrice + (product.cartCount * product.newPrice);
    this.Data.totalCartCount = this.Data.totalCartCount + product.cartCount;
    this.Data.totalShipping = this.Data.totalShipping + (product.cartCount * product.shipping)
  });
  console.log(product, 'right befor databse function', this.Data)
  let document = this.afs.collection('cart').doc(`${this.user['uid']}`)
  document.get().toPromise().then(
    (docSnapshot) => {
      if(docSnapshot.exists){
        document.update({
          products: this.Data.cartList,
          totalShipping: this.Data.totalShipping,
          totalPrice: this.Data.totalPrice,
          totalCartCount: this.Data.totalCartCount
        })
      }else{
        document.set({
          products: this.Data.cartList,
          totalPrice: this.Data.totalPrice,
          totalCartCount: this.Data.totalCartCount,
          totalShipping: this.Data.totalShipping
        }, { merge: true }) 
      }
      message = 'The product ' + product.name + ' has been added to cart.'; 
      console.log(message, 'message add to cart')
      status = 'success';          
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    },(e)=>{
      message = 'Something went wrong please try again'; 
      status = 'error';          
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    });
}


public resetProductCartCount(product:Product){
    product.cartCount = 0;
    let compareProduct = this.Data.compareList.filter(item=>item.objectID == product.objectID)[0];
    if(compareProduct){
        compareProduct.cartCount = 0;
        this.afs.collection('cart').doc(this.user['uid']).update({
          compareList: this.Data.compareList
        })
    };
    let wishProduct = this.Data.wishList.filter(item=>item.objectID == product.objectID)[0];
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
            this.Data.totalShipping = docData.totalShipping ? docData.totalShipping : 0;
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
        }).then(
          ()=>{
            this.snackBar.open('Your name has been updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          },
          (e)=>{
            this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        )
      },(e)=>{
        this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
      ).catch(
        (e)=>{
          this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          console.log(e); 
      })
  }
  updateUserEmail(email) {
    var user = firebase.auth().currentUser;
    user.updateEmail(email).then(
      ()=>{
        this.sendEmailVerify();
        this.afs.collection('customer').doc(this.user['uid']).update({
          email:email
        }).then(
          ()=>{
            this.snackBar.open('Your email has been updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          },
          (e)=>{
            this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        )
      },(e)=>{
        this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
      ).catch(
        (e)=>{
          this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          console.log(e);
      })
  }
  
  resetUserPassword(email) {
    var user = firebase.auth().currentUser;
    this.afAuth.auth.sendPasswordResetEmail(email).then(
    ()=>{
      this.snackBar.open('Your password has been updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });        

    }
    ).catch(
      (error) => {
        this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        
      }
    );
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
