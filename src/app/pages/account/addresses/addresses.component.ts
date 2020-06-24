import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../../app.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  countryControl:FormControl;
  selectedBillingCountry: FormControl;
  selectedShippingCountry: FormControl;
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
      'country': [this.selectedBillingCountry, Validators.required],
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
      'country': [this.selectedShippingCountry, Validators.required],
      'city': ['', Validators.required],
      'state': '',
      'zip': ['', Validators.required],
      'address': ['', Validators.required]
    });

    if(this.user['billingAddress']){
      Object.keys(this.user['billingAddress']).forEach(key => {
        this.billingForm.get(key).setValue(this.user['billingAddress'][key])
      });
      let country = this.countries.find((elt)=> {return elt.code == this.billingForm.get('country').value})
      this.billingForm.get('country').setValue(country)
      this.selectedBillingCountry = new FormControl(this.user['billingAddress'].country.code);
      console.log(this.selectedBillingCountry)
    }
    if(this.user['shippingAddress']){
      Object.keys(this.user['shippingAddress']).forEach(key => {
        this.shippingForm.get(key).setValue(this.user['shippingAddress'][key])
      });
      let country = this.countries.find((elt)=> {return elt.code == this.shippingForm.get('country').value})
      this.shippingForm.get('country').setValue(country)
      this.selectedShippingCountry =  new FormControl(this.user['shippingAddress'].country.code);
    }
    
  }
  
  public onBillingFormSubmit(values:Object):void {
    if (this.billingForm.valid && this.billingForm.pristine == false) {
      console.log(this.billingForm.value)
      this.afs.collection('customer').doc(this.user['uid']).update({
        billingAddress : this.billingForm.value
      })
      this.snackBar.open('Your billing address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

    }
  }

  public onShippingFormSubmit(values:Object):void {
    if (this.shippingForm.valid && this.billingForm.pristine == false) {
      console.log(this.shippingForm.value)
      this.afs.collection('customer').doc(this.user['uid']).update({
        shippingAddress : this.shippingForm.value
      }).then(
        ()=>{
          this.snackBar.open('Your shipping address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        }
      ),(e)=>{
        this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }
  }

}
