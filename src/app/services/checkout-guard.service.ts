import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuardService implements CanActivate {

  constructor(private router : Router, private auth : AuthService) { }

  canActivate(route : ActivatedRouteSnapshot,state : RouterStateSnapshot) 
  : Observable<boolean> | Promise<boolean> | boolean {
      console.log(this.auth.Data.cartList)
    if(this.auth.Data.cartList.length > 0) {
      return true
    } else {
        this.router.navigate(['/'])
    }
  }
}
