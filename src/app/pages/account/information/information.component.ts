import { element } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../../app.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  user:User;
  constructor(public formBuilder: FormBuilder, private afs:AngularFirestore, private auth:AuthService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.auth.user;
    this.infoForm = this.formBuilder.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])]
    });

    this.passwordForm = this.formBuilder.group({
      'currentPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmNewPassword': ['', Validators.required]
    },{validator: matchingPasswords('newPassword', 'confirmNewPassword')});

    if(this.user['displayName']){
      this.infoForm.get('firstName').setValue(this.user['displayName'].split(' ')[0]);
      this.infoForm.get('lastName').setValue(this.user['displayName'].split(' ')[1])
    }
    if(this.user['email']){
      this.infoForm.get('email').setValue(this.user['email']);
    }

  }

  public onInfoFormSubmit(values:Object):void {
    if (this.infoForm.valid) {
      let name = this.infoForm.value.firstName + ' ' + this.infoForm.value.lastName
      console.log(name)
      if((this.infoForm.value.firstName != this.user['displayName'].split(' ')[0] || this.infoForm.value.lastName != this.user['displayName'].split(' ')[1]) && this.infoForm.value.email == this.user['email']){
        this.auth.updateProfileName(name)
      }
      if((this.infoForm.value.firstName == this.user['displayName'].split(' ')[0] && this.infoForm.value.lastName == this.user['displayName'].split(' ')[1]) && this.infoForm.value.email != this.user['email']){
        this.auth.updateUserEmail(this.infoForm.value.email)
      }
      if(this.infoForm.value.firstName != this.user['displayName'].split(' ')[0] && this.infoForm.value.lastName != this.user['displayName'].split(' ')[1] && this.infoForm.value.email != this.user['email']){
        this.afs.collection('customer').doc(this.user['uid']).update({
          fullName: name,
          email: this.infoForm.value.email
        }).then(
          ()=>{
            this.auth.updateProfileName(name)
            this.auth.updateUserEmail(this.infoForm.value.email)
          })
        //   .catch(
        //   (error)=>{
        //     this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        //   }
        // ).finally(
        //   ()=>{
        //     this.snackBar.open('Your account information has been updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        //   }
        // )
      }
    }
  }

  public onPasswordFormSubmit(values:Object):void {
    if (this.passwordForm.valid) {
      this.auth.resetUserPassword(this.passwordForm.value.newPassword)
    }
  }

}
