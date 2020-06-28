import { AppService } from './../../app.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper, MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
const Handlebars = require("handlebars");
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  countries = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;
  selectedBillingCountry: FormControl;
  monthsArray:string[]=["January", "February", "March","April","May", "June","July","August","September", "October", "November","December"]
  cardLastDigits: string;
  stepId=1;
  shipping: any;

  constructor(public authService : AuthService,
              public formBuilder: FormBuilder,
              private appService : AppService,
              public snackBar: MatSnackBar,
          
              private afs : AngularFirestore) { }

  ngOnInit() {   
    this.authService.Data.cartList.forEach(product=>{
      this.grandTotal += product.cartCount*product.newPrice;
    });
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: '',
      company: '',
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: [this.selectedBillingCountry, Validators.required],
      city: ['', Validators.required],
      state: '',
      zip: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [this.deliveryMethods[0], Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });
    console.log(this.deliveryMethods[0])
    if(this.authService.user['billingAddress']){
      console.log(this.authService.user['billingAddress'])
      Object.keys(this.authService.user['billingAddress']).forEach(key => {
        this.billingForm.get(key).setValue(this.authService.user['billingAddress'][key])
      });
      this.billingForm.get('country').setValue(this.authService.user['billingAddress'].country.code)
      this.selectedBillingCountry = new FormControl(this.authService.user['billingAddress'].country.code);
    }
    if(this.authService.user['deliveryMethod']){
      this.deliveryForm.get('deliveryMethod').setValue(this.authService.user['deliveryMethod'])
    }
    if(this.authService.user['paymentMethod']){
      Object.keys(this.authService.user['paymentMethod']).forEach(key => {
        this.paymentForm.get(key).setValue(this.authService.user['paymentMethod'][key])
        if(key == 'cardNumber'){
          this.cardLastDigits = this.authService.user['paymentMethod'][key].substring(12);
        }
      });
    }
  }

  getStepId($event){
    this.stepId++;
    if(this.stepId == 4){
      this.cardLastDigits = this.paymentForm.get('cardNumber').value.substring(12);
    }
    if(this.stepId == 2){
      let country = this.countries.find((elt)=> {return elt.code == this.billingForm.get('country').value})
      this.billingForm.get('country').setValue(country)
      console.log(this.billingForm)
    }
  }

  public placeOrder(){
    
    console.log(this.billingForm)
    if(this.billingForm.valid && this.deliveryForm.valid && this.paymentForm.valid){
      if(this.billingForm.pristine == false || this.deliveryForm.pristine == false || this.paymentForm.pristine == false){
        this.afs.collection('customer').doc(this.authService.user['uid']).update({
          billingAddress: this.billingForm.value,
          paymentMethod: this.paymentForm.value,
          deliveryMethod: this.deliveryForm.value.deliveryMethod
        })
      }
      let date = new Date();
      let orderDate = this.monthsArray[date.getMonth()] + ' '+ date.getDate() + ', '+ date.getFullYear();
      this.shipping = this.deliveryMethods.find((elt)=> {return (elt.value == this.deliveryForm.get('deliveryMethod').value)})
      console.log(this.shipping, this.deliveryForm.get('deliveryMethod').value)
      this.afs.collection('order').add({
        deliveryMethod: this.deliveryForm.value.deliveryMethod,
        billingAddress: this.billingForm.value,
        paymentMethod: this.paymentForm.value,
        customerId: this.authService.user['uid'],
        customerName:this.authService.user['displayName'],
        customerEmail:this.authService.user['email'],
        products: this.authService.Data.cartList,
        totalPrice: this.authService.Data.totalPrice,
        totalOrderCount: this.authService.Data.totalCartCount,
        createdAt: orderDate
      }).then(
        ()=>{
          console.log(
            'name' ,this.billingForm.value.firstName,
           'lastname', this.billingForm.value.lastName,
            'adress',this.billingForm.value.address,
            'city',this.billingForm.value.city,
             'country',this.billingForm.value.country.name,
             'date',orderDate,
             'productlist',this.authService.Data.cartList,
             'shipping',this.shipping.valueNumber,
             'total',this.grandTotal
          )
          this.authService.db.collection('mail').add({
            from:'eachonlinedeveloper@gmail.com',
            to: this.authService.user['email'],
            template:{
              name:'invoiceTemplate',
              data:{
                firstname: this.billingForm.value.firstName,
                lastname:this.billingForm.value.lastName,
                address:this.billingForm.value.address,
                city:this.billingForm.value.city,
                country: this.billingForm.value.country.name,
                orderDate: orderDate,
                product: this.authService.Data.cartList,
                grandTotal: +this.grandTotal + this.shipping.valueNumber,
                shipping: this.shipping.valueNumber,
                total: this.grandTotal
              }
            }
          }).then(
            ()=>{
              this.snackBar.open('Your order has been placed! An email confirmation has been sent to you.', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
              this.afs.collection('cart').doc(this.authService.user['uid']).update({
                products:[],
                totalCartCount:0,
                totalPrice:0
              }).then(
                ()=>{
                  this.horizontalStepper._steps.forEach(step => step.editable = false);
                  // this.verticalStepper._steps.forEach(step => step.editable = false);
                  this.authService.Data.cartList.length = 0;    
                  this.authService.Data.totalPrice = 0;
                  this.authService.Data.totalCartCount = 0;
                },(e)=>{
                  this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
                }
              )
            }
          )
        },
        (e)=>{
          this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      ).catch(
        (error)=>{
          console.log(error)
          this.snackBar.open('Something went wrong please try again', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      )
    }
    // this.horizontalStepper._steps.forEach(step => step.editable = false);
    // this.verticalStepper._steps.forEach(step => step.editable = false);
    // this.authService.Data.cartList.length = 0;    
    // this.authService.Data.totalPrice = 0;
    // this.authService.Data.totalCartCount = 0;
  }

}
