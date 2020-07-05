import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../../app.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '../../../app.service';
import '../../../../assets/phonevalidation';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare var isValidNumber: any;
declare var isValidCountryCode: any;

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
  private _onDestroy = new Subject<void>();
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
      'middleName': [''],
      'company': [''],
      'email': ['', Validators.required],
      'phone': ['', [Validators.required]],
      'country': ['', Validators.required],
      'countryCode':['', Validators.required],
      'city': ['', Validators.required],
      'state': [''],
      'zip': ['', [Validators.required]],
      'address': ['', Validators.required]
    });
    
    this.shippingForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'middleName': '',
      'company': [''],
      'email': ['', Validators.required],
      'countryCode':['', Validators.required],
      'phone': ['', Validators.required],
      'country': ['', Validators.required],
      'city': ['', Validators.required],
      'state': [''],
      'zip': ['', [Validators.required]],
      'address': ['', Validators.required]
    });
    this.shippingForm.get('countryCode').valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.validateCountry('shipping');
    });
    this.shippingForm.get('phone').valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.validatePhone('shipping');
    });
    this.billingForm.get('countryCode').valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      console.log('validate')
      this.validateCountry('billing');
    });
    this.billingForm.get('phone').valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.validatePhone('billing');
    });

    

    if(this.user['billingAddress']){
      Object.keys(this.user['billingAddress']).forEach(key => {
        console.log(key);
        console.log(this.user['billingAddress'][key])
        if(key == 'country') {
          this.billingForm.get(key).setValue(this.user['billingAddress'][key].code)
        } else {
          this.billingForm.get(key).setValue(this.user['billingAddress'][key])
        }
      });
      let country = this.countries.find((elt)=> {return elt.code == this.billingForm.get('country').value})
      if(country) {
        this.billingForm.get('country').setValue(country.code) 
      }
      console.log(this.billingForm.get('country').value)
      // this.selectedBillingCountry.setValue(country);
      console.log(this.selectedBillingCountry)
    }
    if(this.user['shippingAddress']){
      Object.keys(this.user['shippingAddress']).forEach(key => {
        this.shippingForm.get(key).setValue(this.user['shippingAddress'][key])
      });
      let country = this.countries.find((elt)=> {return elt.code == this.shippingForm.get('country').value})
      this.shippingForm.get('country').setValue(country.code)
      // this.selectedShippingCountry.setValue(country);
    }
    
  }

  validateCountry(type){
    if(type == 'shipping'){
      console.log(this.shippingForm.value.countryCode,isValidCountryCode(this.shippingForm.value.countryCode) )
      if(this.shippingForm.value.countryCode && isValidCountryCode(this.shippingForm.value.countryCode)){
        this.shippingForm.get('countryCode').setErrors(null)
      }else{
        this.shippingForm.get('countryCode').setErrors({incorrect: true});
      }
    }else{
      console.log(this.billingForm.value.countryCode, isValidCountryCode(this.billingForm.value.countryCode))
      if(this.billingForm.value.countryCode && isValidCountryCode(this.billingForm.value.countryCode)){
        this.billingForm.get('countryCode').setErrors(null)
      }else{
        this.billingForm.get('countryCode').setErrors({incorrect: true});
      }
    }
  }

  validatePhone(type){
    if(type == 'shipping'){
      if(this.shippingForm.value.phone && isValidNumber(this.shippingForm.value.phone)){
        this.shippingForm.get('phone').setErrors(null)
      }else{
        this.shippingForm.get('phone').setErrors({incorrect: true});
      }
    }else{
      if(this.billingForm.value.phone && isValidNumber(this.billingForm.value.phone)){
        this.billingForm.get('phone').setErrors(null)
      }else{
        this.billingForm.get('phone').setErrors({incorrect: true});
      }
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
