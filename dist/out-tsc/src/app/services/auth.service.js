var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
var AuthService = /** @class */ (function () {
    function AuthService(afAuth, afs, formBuilder, router, scripts) {
        this.afAuth = afAuth;
        this.afs = afs;
        this.formBuilder = formBuilder;
        this.router = router;
        this.scripts = scripts;
        this.db = firebase.firestore();
        this.isMyListing = false;
    }
    AuthService.prototype.register = function (values) {
        var _this = this;
        this.afAuth.createUserWithEmailAndPassword(values['email'], values['password']).then(function (data) {
            console.log(data);
            _this.afs.doc("customer/" + data.user.uid).set({}, { merge: true });
            return _this.afs.doc("customer/" + data.user.uid).update({
                email: data.user.email,
                fullName: values['name'],
                listings: []
            }).then(function () {
                document.getElementsByClassName('reg-overlay')[0].click();
                _this.loggedIn = true;
                data.user.updateProfile({ displayName: values['name'] }).then(function (data) {
                    console.log('updateProfile', data);
                    _this.sendEmailVerify();
                });
            }).catch(function (error) {
                console.log(error);
            });
        });
    };
    AuthService.prototype.login = function (values) {
        var _this = this;
        this.afAuth.auth.signin(values['email'], values['password']).then(function (data) {
            console.log(data);
            document.getElementsByClassName('reg-overlay')[0].click();
            _this.loggedIn = true;
        }, function (e) {
            console.log('err', e);
            if (e['code'] && e['message']) {
            }
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        this.afAuth.signOut().then(function (data) {
            console.log(data);
            _this.scripts.inject();
            _this.loggedIn = false;
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
                            console.log("Document data:", doc.data());
                            user['listings'] = [];
                            _this.getListings(doc.data().listings).then(function (data) {
                                console.log('promise returned', data);
                                user['listings'] = data;
                            });
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
    AuthService.prototype.updateProfileName = function (name) {
        var user = firebase.auth().currentUser;
        user.updateProfile({ displayName: name }).then(function () { console.log('UPDATED PROFILE NAME'); firebase.auth().currentUser.reload(); }).catch(function (e) { console.log(e); });
    };
    AuthService.prototype.updateUserEmail = function (email) {
        var _this = this;
        var user = firebase.auth().currentUser;
        user.updateEmail(email).then(function () { _this.sendEmailVerify(); }).catch(function (e) { console.log(e); });
    };
    AuthService.prototype.resetUserPassword = function () {
        this.afAuth.sendPasswordResetEmail(this.user['email']).then(function () { }).catch(function (error) { console.log(error); });
    };
    AuthService.prototype.sendEmailVerify = function () {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function () { }).catch(function (error) { console.log(error); });
    };
    AuthService.prototype.getCategories = function () {
        var _this = this;
        var cats = [];
        var subcats = [];
        return new Promise(function (resolve, reject) {
            _this.db.collection('categories').get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // console.log(doc.id, " => ", doc.data());
                    cats.push(doc.data());
                });
                _this.db.collection('subcategories').get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // console.log(doc.id, " => ", doc.data());
                        subcats.push(doc.data());
                    });
                    _this.categories = cats;
                    _this.subcategories = subcats;
                    resolve(true);
                    console.log(_this.categories, _this.subcategories);
                }).catch(function (error) {
                    console.log('subcat fail', error);
                    reject(error);
                });
            }).catch(function (error) {
                console.log('cat fail', error);
                reject(error);
            });
        });
    };
    var _a;
    AuthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireAuth, AngularFirestore, FormBuilder, Router, typeof (_a = typeof ScriptInjectorService !== "undefined" && ScriptInjectorService) === "function" ? _a : Object])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map