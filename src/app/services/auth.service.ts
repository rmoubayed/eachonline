import { User } from '../app.service';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
    providedIn:'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, public formBuilder: FormBuilder, public router:Router) { }
  loggedIn : boolean;
  user : User
  db = firebase.firestore();
  
  register(values) {
    this.afAuth.auth.createUserWithEmailAndPassword(values['email'], values['password']).then(
      (data)=>{
        console.log(data);
        this.loggedIn = true;
        this.user = data.user;
        data.user.updateProfile({displayName: values['name']}).then(
            (data)=>{
            console.log('updateProfile', data);
            this.sendEmailVerify();
            }
        )
        this.router.navigate(['/']);
        
        // return this.afs.doc(`customer/${data.user.uid}`).update({
        //   email: data.user.email,
        //   fullName: values['name'],
        //   listings: []
        // }).then(
        //   ()=>{ 
        //     (<HTMLButtonElement>document.getElementsByClassName('reg-overlay')[0]).click();
        //     this.loggedIn = true;
        //     data.user.updateProfile({displayName: values['name']}).then(
        //       (data)=>{
        //         console.log('updateProfile', data);
        //         this.sendEmailVerify();
        //       }
        //     )
        //   }
        // ).catch( (error) => {
        //     console.log(error);
        // });
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
          resolve('no user');
        }
      })
    })
  }
  
  updateProfileName(name) {
    var user = firebase.auth().currentUser;
    user.updateProfile({displayName: name}).then(()=> {console.log('UPDATED PROFILE NAME');firebase.auth().currentUser.reload()}).catch((e)=>{console.log(e)})
  }
  updateUserEmail(email) {
    var user = firebase.auth().currentUser;
    user.updateEmail(email).then(()=> {this.sendEmailVerify()}).catch((e)=>{console.log(e)})
  }
  resetUserPassword() {
    this.afAuth.auth.sendPasswordResetEmail(this.user['email']).then(()=>{}).catch((error) => {console.log(error)});
  }
  sendEmailVerify() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {}).catch(function(error) {console.log(error)});
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
