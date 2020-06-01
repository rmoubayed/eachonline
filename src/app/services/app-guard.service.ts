import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AppGuardService implements CanActivate, CanActivateChild {

  constructor(private router : Router, private auth : AuthService) { }

  canActivate(route : ActivatedRouteSnapshot,state : RouterStateSnapshot) 
  : Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.auth.getCurrentUser().then(
        (data)=>{
          console.log(data);
          resolve(true);
        }
      )
    })
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
