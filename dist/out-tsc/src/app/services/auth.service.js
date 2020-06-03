var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AppService } from './../app.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
var AuthService = /** @class */ (function () {
    function AuthService(afAuth, appService, afs, formBuilder, router, http, snackBar) {
        this.afAuth = afAuth;
        this.appService = appService;
        this.afs = afs;
        this.formBuilder = formBuilder;
        this.router = router;
        this.http = http;
        this.snackBar = snackBar;
        this.db = firebase.firestore();
        this.Data = {
            categories: [],
            compareList: [],
            wishList: [],
            cartList: [],
            totalPrice: null,
            totalCartCount: 0 //totalCartCount
        };
    }
    AuthService.prototype.register = function (values) {
        var _this = this;
        this.afAuth.auth.createUserWithEmailAndPassword(values['email'], values['password']).then(function (data) {
            console.log(data);
            _this.afs.doc("cart/" + data.user.uid).set({}, { merge: true });
            _this.afs.doc("customer/" + data.user.uid).set({}, { merge: true });
            return _this.afs.doc("customer/" + data.user.uid).update({
                email: data.user.email,
                fullName: values['name']
            }).then(function () {
                _this.loggedIn = true;
                _this.user = data.user;
                data.user.updateProfile({ displayName: values['name'] }).then(function (data) {
                    console.log('updateProfile', data);
                    _this.sendEmailVerify();
                    _this.router.navigate(['/']);
                });
            }).catch(function (error) {
                console.log(error);
            });
        });
    };
    AuthService.prototype.login = function (values) {
        var _this = this;
        console.log(values, 'values on login');
        this.afAuth.auth.signInWithEmailAndPassword(values['email'], values['password']).then(function (data) {
            console.log(data);
            _this.user = data.user;
            _this.loggedIn = true;
        }, function (e) {
            console.log('err', e);
            if (e['code'] && e['message']) {
            }
        });
    };
    AuthService.prototype.doGoogleLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            _this.afAuth.auth
                .signInWithPopup(provider)
                .then(function (res) {
                resolve(res);
                _this.router.navigate(['/']);
            });
        });
    };
    AuthService.prototype.doFacebookLogin = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var provider = new firebase.auth.FacebookAuthProvider();
            _this.afAuth.auth
                .signInWithPopup(provider)
                .then(function (res) {
                resolve(res);
            }, function (err) {
                console.log(err);
                reject(err);
            });
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        this.afAuth.auth.signOut().then(function (data) {
            console.log(data);
            _this.loggedIn = false;
            _this.user = null;
            _this.Data = {
                categories: [],
                compareList: [],
                wishList: [],
                cartList: [],
                totalPrice: null,
                totalCartCount: 0
            };
            _this.router.navigate(['/']);
        });
    };
    AuthService.prototype.getCurrentUser = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var user = firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    _this.loggedIn = true;
                    _this.user = user;
                    // firebase.f
                    console.log('USER', user);
                    _this.db.collection('customer').doc(user.uid).get().then(function (doc) {
                        if (doc.exists) {
                            var user_1 = doc.data();
                            _this.user['billingAddress'] = user_1.billingAddress ? user_1.billingAddress : {};
                            _this.user['shippingAddress'] = user_1.shippingAddress ? user_1.shippingAddress : {};
                            console.log("Document data:", doc.data());
                        }
                        else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                        reject(error);
                    });
                    resolve(user);
                }
                else {
                    _this.loggedIn = false;
                    resolve('no user');
                }
            });
        });
    };
    AuthService.prototype.addToCompare = function (product) {
        var _this = this;
        var message, status;
        if (this.Data.compareList.filter(function (item) { return item.id == product.id; })[0]) {
            message = 'The product ' + product.name + ' already added to comparison list.';
            status = 'error';
        }
        else {
            this.Data.compareList.push(product);
            message = 'The product ' + product.name + ' has been added to comparison list.';
            status = 'success';
        }
        var document = this.afs.collection('cart').doc("" + this.user['uid']);
        document.get().toPromise().then(function (docSnapshot) {
            if (docSnapshot.exists) {
                document.update({
                    compareList: _this.Data.compareList
                });
            }
            else {
                document.set({
                    compareList: _this.Data.compareList
                }, { merge: true });
            }
        });
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    };
    AuthService.prototype.addToWishList = function (product) {
        var _this = this;
        var message, status;
        if (this.Data.wishList.filter(function (item) { return item.id == product.id; })[0]) {
            message = 'The product ' + product.name + ' already added to wish list.';
            status = 'error';
        }
        else {
            this.Data.wishList.push(product);
            message = 'The product ' + product.name + ' has been added to wish list.';
            status = 'success';
        }
        var document = this.afs.collection('cart').doc("" + this.user['uid']);
        document.get().toPromise().then(function (docSnapshot) {
            if (docSnapshot.exists) {
                document.update({
                    wishList: _this.Data.wishList
                });
            }
            else {
                document.set({
                    wishList: _this.Data.wishList
                }, { merge: true });
            }
        });
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    };
    AuthService.prototype.addToCart = function (product) {
        var _this = this;
        var message, status;
        this.Data.totalPrice = null;
        this.Data.totalCartCount = null;
        if (this.Data.cartList.filter(function (item) { return item.id == product.id; })[0]) {
            var item = this.Data.cartList.filter(function (item) { return item.id == product.id; })[0];
            item.cartCount = product.cartCount;
        }
        else {
            this.Data.cartList.push(product);
        }
        this.Data.cartList.forEach(function (product) {
            _this.Data.totalPrice = _this.Data.totalPrice + (product.cartCount * product.newPrice);
            _this.Data.totalCartCount = _this.Data.totalCartCount + product.cartCount;
        });
        var document = this.afs.collection('cart').doc("" + this.user['uid']);
        document.get().toPromise().then(function (docSnapshot) {
            if (docSnapshot.exists) {
                document.update({
                    products: _this.Data.cartList,
                    totalPrice: _this.Data.totalPrice,
                    totalCartCount: _this.Data.totalCartCount
                });
            }
            else {
                document.set({
                    products: _this.Data.cartList,
                    totalPrice: _this.Data.totalPrice,
                    totalCartCount: _this.Data.totalCartCount
                }, { merge: true });
            }
        });
        message = 'The product ' + product.name + ' has been added to cart.';
        status = 'success';
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    };
    AuthService.prototype.resetProductCartCount = function (product) {
        product.cartCount = 0;
        var compareProduct = this.Data.compareList.filter(function (item) { return item.id == product.id; })[0];
        if (compareProduct) {
            compareProduct.cartCount = 0;
            this.afs.collection('cart').doc(this.user['uid']).update({
                compareList: this.Data.compareList
            });
        }
        ;
        var wishProduct = this.Data.wishList.filter(function (item) { return item.id == product.id; })[0];
        if (wishProduct) {
            wishProduct.cartCount = 0;
            this.afs.collection('cart').doc(this.user['uid']).update({
                wishList: this.Data.wishList
            });
        }
        ;
    };
    AuthService.prototype.getCart = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.collection('cart').doc(_this.user['uid']).get().then(function (doc) {
                if (doc.exists) {
                    var docData = doc.data();
                    console.log(docData, 'cart data');
                    _this.Data.cartList = docData.products ? docData.products : [];
                    _this.Data.wishList = docData.wishList ? docData.wishList : [];
                    _this.Data.compareList = docData.compareList ? docData.compareList : [];
                    _this.Data.totalCartCount = docData.totalCartCount ? docData.totalCartCount : 0;
                    _this.Data.totalPrice = docData.totalPrice ? docData.totalPrice : 0;
                    console.log(_this.user);
                }
                resolve(true);
            }).catch(function (error) {
                console.log('cat fail', error);
                reject(error);
            });
        });
    };
    AuthService.prototype.updateProfileName = function (name) {
        var _this = this;
        console.log(name);
        var user = firebase.auth().currentUser;
        user.updateProfile({ displayName: name }).then(function () {
            console.log('UPDATED PROFILE NAME');
            firebase.auth().currentUser.reload();
            _this.afs.collection('customer').doc(_this.user['uid']).update({
                fullName: name
            });
        }).catch(function (e) {
            _this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            console.log(e);
        }).finally(function () {
            _this.snackBar.open('Your name has been updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        });
    };
    AuthService.prototype.updateUserEmail = function (email) {
        var _this = this;
        var user = firebase.auth().currentUser;
        user.updateEmail(email).then(function () {
            _this.sendEmailVerify();
            _this.afs.collection('customer').doc(_this.user['uid']).update({
                email: email
            });
        }).catch(function (e) {
            _this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            console.log(e);
        }).finally(function () {
            _this.snackBar.open('Your email has been updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        });
    };
    AuthService.prototype.resetUserPassword = function (newPassword) {
        var user = firebase.auth().currentUser;
        user.updatePassword(newPassword).then(function () {
            this.snackBar.open('Your password has been updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        }).catch(function (error) {
            this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        });
    };
    AuthService.prototype.sendEmailVerify = function () {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () {
        }).catch(function (error) {
            console.log(error);
        });
    };
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [AngularFireAuth, AppService, AngularFirestore, FormBuilder, Router, HttpClient, MatSnackBar])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map