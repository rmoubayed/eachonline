import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SignInComponent } from './sign-in.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

export const routes = [
  { path: '', component: SignInComponent, pathMatch: 'full', canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    SignInComponent
  ]
})
export class SignInModule { }
