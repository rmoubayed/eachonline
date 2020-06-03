import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../../app.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  billingForm: FormGroup;
  shippingForm: FormGroup;
  countries = [];
  user:User;
  constructor(public appService:AppService, 
              private afs: AngularFirestore, 
              public formBuilder: FormBuilder, 
              private authService:AuthService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.authService.user;
    this.countries = this.appService.getCountries();
    console.log(this.countries)
    this.billingForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'middleName': '',
      'company': '',
      'email': ['', Validators.required],
      'phone': ['', Validators.required],
      'country': ['', Validators.required],
      'city': ['', Validators.required],
      'state': '',
      'zip': ['', Validators.required],
      'address': ['', Validators.required]
    });
    this.shippingForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'middleName': '',
      'company': '',
      'email': ['', Validators.required],
      'phone': ['', Validators.required],
      'country': ['', Validators.required],
      'city': ['', Validators.required],
      'state': '',
      'zip': ['', Validators.required],
      'address': ['', Validators.required]
    });

    if(this.user['billingAddress']){
      Object.keys(this.user['billingAddress']).forEach(key => {
        this.billingForm.get(key).setValue(this.user['billingAddress'][key])
      });
    }
    if(this.user['shippingAddress']){
      Object.keys(this.user['shippingAddress']).forEach(key => {
        this.shippingForm.get(key).setValue(this.user['shippingAddress'][key])
      });
    }
    
  }
  
  public onBillingFormSubmit(values:Object):void {
    if (this.billingForm.valid) {
      this.afs.collection('customer').doc(this.user['uid']).update({
        billingAddress : this.billingForm.value
      })
      this.snackBar.open('Your billing address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

    }
  }

  public onShippingFormSubmit(values:Object):void {
    if (this.shippingForm.valid) {
      this.afs.collection('customer').doc(this.user['uid']).update({
        shippingAddress : this.shippingForm.value
      })
      this.snackBar.open('Your shipping address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
