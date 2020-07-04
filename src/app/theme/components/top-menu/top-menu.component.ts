import { Router, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppService, User } from '../../../app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public currencies = ['USD'];
  public currency:any;
  data: Data;
  user: User;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    // { name:'German', image: 'assets/images/flags/de.svg' },
    // { name:'French', image: 'assets/images/flags/fr.svg' },
    // { name:'Russian', image: 'assets/images/flags/ru.svg' },
    // { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;
  localAuthService:AuthService;

  constructor(public appService:AppService, public authService: AuthService, public router:Router) { }

  ngOnInit() {
    this.localAuthService = this.authService;
    this.user = this.authService.user;
    console.log(this.user)
    this.data = this.authService.Data;
    this.currency = this.currencies[0];
    this.flag = this.flags[0];    
  }

  public changeCurrency(currency){
    this.currency = currency;
  }

  public changeLang(flag){
    this.flag = flag;
  }

  public signOut(){
    this.authService.logout();
  }

  

}
