import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router : Router, private auth : AuthService) { }

  canActivate(route : ActivatedRouteSnapshot,state : RouterStateSnapshot) 
  : Observable<boolean> | Promise<boolean> | boolean {
    var user = firebase.auth().currentUser;
    this.auth.user = user;
    console.log('USe', user);
    if(!user) {
      return true
    } else {
      this.router.navigate(['/'])
    }
  }
}
