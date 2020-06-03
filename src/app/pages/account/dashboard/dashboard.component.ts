import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user:User;
  constructor(private authService:AuthService ){} 

  ngOnInit() {
    this.user = this.authService.user;
    console.log(this.user)
  }

}
