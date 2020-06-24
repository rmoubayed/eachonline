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
          this.authService.db.collection('emailTemplates').doc('invoiceTemplate').update(
            {
              subject:'You order has been placed',
              html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <html xmlns="http://www.w3.org/1999/xhtml">
              <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Oxygen Invoice</title>
              
                <style type="text/css">
                  /* Take care of image borders and formatting, client hacks */
                  img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
                  a img { border: none; }
                  table { border-collapse: collapse !important;}
                  #outlook a { padding:0; }
                  .ReadMsgBody { width: 100%; }
                  .ExternalClass { width: 100%; }
                  .backgroundTable { margin: 0 auto; padding: 0; width: 100% !important; }
                  table td { border-collapse: collapse; }
                  .ExternalClass * { line-height: 115%; }
                  .container-for-gmail-android { min-width: 600px; }
              
              
                  /* General styling */
                  * {
                    font-family: Helvetica, Arial, sans-serif;
                  }
              
                  body {
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-size-adjust: none;
                    width: 100% !important;
                    margin: 0 !important;
                    height: 100%;
                    color: #676767;
                  }
              
                  td {
                    font-family: Helvetica, Arial, sans-serif;
                    font-size: 14px;
                    color: #777777;
                    text-align: center;
                    line-height: 21px;
                  }
              
                  a {
                    color: #676767;
                    text-decoration: none !important;
                  }
              
                  .pull-left {
                    text-align: left;
                  }
              
                  .pull-right {
                    text-align: right;
                  }
              
                  .header-lg,
                  .header-md,
                  .header-sm {
                    font-size: 32px;
                    font-weight: 700;
                    line-height: normal;
                    padding: 35px 0 0;
                    color: #4d4d4d;
                  }
              
                  .header-md {
                    font-size: 24px;
                  }
              
                  .header-sm {
                    padding: 5px 0;
                    font-size: 18px;
                    line-height: 1.3;
                  }
              
                  .content-padding {
                    padding: 20px 0 5px;
                  }
              
                  .mobile-header-padding-right {
                    width: 290px;
                    text-align: right;
                    padding-left: 10px;
                  }
              
                  .mobile-header-padding-left {
                    width: 290px;
                    text-align: left;
                    padding-left: 10px;
                  }
              
                  .free-text {
                    width: 100% !important;
                    padding: 10px 60px 0px;
                  }
              
                  .button {
                    padding: 30px 0;
                  }
              
                  .mini-block {
                    border: 1px solid #e5e5e5;
                    border-radius: 5px;
                    background-color: #ffffff;
                    padding: 12px 15px 15px;
                    text-align: left;
                    width: 253px;
                  }
              
                  .mini-container-left {
                    width: 278px;
                    padding: 10px 0 10px 15px;
                  }
              
                  .mini-container-right {
                    width: 278px;
                    padding: 10px 14px 10px 15px;
                  }
              
                  .product {
                    text-align: left;
                    vertical-align: top;
                    width: 175px;
                  }
              
                  .total-space {
                    padding-bottom: 8px;
                    display: inline-block;
                  }
              
                  .item-table {
                    padding: 50px 20px;
                    width: 560px;
                  }
              
                  .item {
                    width: 300px;
                  }
              
                  .mobile-hide-img {
                    text-align: left;
                    width: 125px;
                  }
              
                  .mobile-hide-img img {
                    border: 1px solid #e6e6e6;
                    border-radius: 4px;
                  }
              
                  .title-dark {
                    text-align: left;
                    border-bottom: 1px solid #cccccc;
                    color: #4d4d4d;
                    font-weight: 700;
                    padding-bottom: 5px;
                  }
              
                  .item-col {
                    padding-top: 20px;
                    text-align: left;
                    vertical-align: top;
                  }
              
                  .force-width-gmail {
                    min-width:600px;
                    height: 0px !important;
                    line-height: 1px !important;
                    font-size: 1px !important;
                  }
              
                </style>
              
                <style type="text/css" media="screen">
                  @import url(http://fonts.googleapis.com/css?family=Oxygen:400,700);
                </style>
              
                <style type="text/css" media="screen">
                  @media screen {
                    /* Thanks Outlook 2013! */
                    * {
                      font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
                    }
                  }
                </style>
              
                <style type="text/css" media="only screen and (max-width: 480px)">
                  /* Mobile styles */
                  @media only screen and (max-width: 480px) {
              
                    table[class*="container-for-gmail-android"] {
                      min-width: 290px !important;
                      width: 100% !important;
                    }
              
                    img[class="force-width-gmail"] {
                      display: none !important;
                      width: 0 !important;
                      height: 0 !important;
                    }
              
                    table[class="w320"] {
                      width: 320px !important;
                    }
              
                    td[class*="mobile-header-padding-left"] {
                      width: 160px !important;
                      padding-left: 0 !important;
                    }
              
                    td[class*="mobile-header-padding-right"] {
                      width: 160px !important;
                      padding-right: 0 !important;
                    }
              
                    td[class="header-lg"] {
                      font-size: 24px !important;
                      padding-bottom: 5px !important;
                    }
              
                    td[class="content-padding"] {
                      padding: 5px 0 5px !important;
                    }
              
                     td[class="button"] {
                      padding: 5px 5px 30px !important;
                    }
              
                    td[class*="free-text"] {
                      padding: 10px 18px 30px !important;
                    }
              
                    td[class~="mobile-hide-img"] {
                      display: none !important;
                      height: 0 !important;
                      width: 0 !important;
                      line-height: 0 !important;
                    }
              
                    td[class~="item"] {
                      width: 140px !important;
                      vertical-align: top !important;
                    }
              
                    td[class~="quantity"] {
                      width: 50px !important;
                    }
              
                    td[class~="price"] {
                      width: 90px !important;
                    }
              
                    td[class="item-table"] {
                      padding: 30px 20px !important;
                    }
              
                    td[class="mini-container-left"],
                    td[class="mini-container-right"] {
                      padding: 0 15px 15px !important;
                      display: block !important;
                      width: 290px !important;
                    }
              
                  }
                </style>
              </head>
              
              <body>
              <table align="center" cellpadding="0" cellspacing="0" class="container-for-gmail-android" width="100%">
                <tr>
                  <td align="left" valign="top" width="100%" style="background:no-repeat url(https://firebasestorage.googleapis.com/v0/b/eachonline-dev.appspot.com/o/logo%2FEach%20Logo%20Red.png?alt=media&token=6cada846-5339-48fe-aa71-50a89432c41e) #ffffff;">
                    <center>
                    <img src="https://firebasestorage.googleapis.com/v0/b/eachonline-dev.appspot.com/o/logo%2FEach%20Logo%20Red.png?alt=media&token=6cada846-5339-48fe-aa71-50a89432c41e" class="force-width-gmail">
                      <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#ffffff" background="http://s3.amazonaws.com/swu-filepicker/4E687TRe69Ld95IDWyEg_bg_top_02.jpg" style="background-color:transparent">
                        <tr>
                          <td width="100%" height="80" valign="top" style="text-align: center; vertical-align:middle;">
                            <center>
                              <table cellpadding="0" cellspacing="0" width="600" class="w320">
                                <tr>
                                  <td class="pull-left mobile-header-padding-left" style="vertical-align: middle;">
                                    <a href=""><img width="137" height="130" src="https://firebasestorage.googleapis.com/v0/b/eachonline-dev.appspot.com/o/logo%2FEach%20Logo%20Red.png?alt=media&token=6cada846-5339-48fe-aa71-50a89432c41e" alt="logo"></a>
                                  </td>
                                </tr>
                              </table>
                            </center>
                          </td>
                        </tr>
                      </table>
                    </center>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top" width="100%" style="background-color: #f7f7f7;" class="content-padding">
                    <center>
                      <table cellspacing="0" cellpadding="0" width="600" class="w320">
                        <tr>
                          <td class="header-lg">
                            Thank you for your order!
                          </td>
                        </tr>
                        <tr>
                          <td class="free-text">
                            For info about shipping call us on XXXXXX
                          </td>
                        </tr>
        
                        <tr>
                          <td class="w320">
                            <table cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                                <td class="mini-container-left">
                                  <table cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td class="mini-block-padding">
                                        <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:separate !important;">
                                          <tr>
                                            <td class="mini-block">
                                              <span class="header-sm">Shipping Address</span><br />
                                              {{firstname}}{{lastname}} <br />
                                              {{address}} <br />
                                              {{city}}, BC <br />
                                              {{country}}
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                                <td class="mini-container-right">
                                  <table cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                      <td class="mini-block-padding">
                                        <table cellspacing="0" cellpadding="0" width="100%" style="border-collapse:separate !important;">
                                          <tr>
                                            <td class="mini-block">
                                              <span class="header-sm">Date Ordered</span><br />
                                              {{orderDate}}<br />
                                              <br />
                                              <br />
                                              <br/>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </center>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top" width="100%" style="background-color: #ffffff;  border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
                    <center>
                      <table cellpadding="0" cellspacing="0" width="600" class="w320">
                          <tr>
                            <td class="item-table">
                              <table cellspacing="0" cellpadding="0" width="100%">
                                <tr>
                                  <td class="title-dark" width="300">
                                     Item
                                  </td>
                                  <td class="title-dark" width="163">
                                    Qty
                                  </td>
                                  <td class="title-dark" width="97">
                                    Total
                                  </td>
                                </tr>
              
                                {{#each product}}
                                  <tr>
                                    <td class="item-col item">
                                      <table cellspacing="0" cellpadding="0" width="100%">
                                        <tr>
                                          <td class="mobile-hide-img">
                                            <a href=""><img width="110" height="92" src="{{this.images.[0]}}" alt="item2"></a>
                                          </td>
                                          <td class="product">
                                            <span style="color: #4d4d4d; font-weight: bold;">{{this.name}}</span> 
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td class="item-col quantity">
                                      {{this.cartCount}}
                                    </td>
                                    <td class="item-col price">
                                       $ {{this.newPrice}}x{{this.cartCount}}
                                    </td>
                                  </tr>
                                {{/each}}
                                
                                <tr>
                                  <td class="item-col item mobile-row-padding"></td>
                                  <td class="item-col quantity"></td>
                                  <td class="item-col price"></td>
                                </tr>
              
              
                                <tr>
                                  <td class="item-col item">
                                  </td>
                                  <td class="item-col quantity" style="text-align:right; padding-right: 10px; border-top: 1px solid #cccccc;">
                                    <span class="total-space">Subtotal</span> <br />
                                    <span class="total-space">Shipping</span> <br />
                                    <span class="total-space" style="font-weight: bold; color: #4d4d4d">Total</span>
                                  </td>
                                  <td class="item-col price" style="text-align: left; border-top: 1px solid #cccccc;">
                                    <span class="total-space">$ {{total}}</span> <br />
                                    <span class="total-space">$ {{shipping}}</span>  <br />
                                    <span class="total-space" style="font-weight:bold; color: #4d4d4d">$ {{grandTotal}}</span>
                                  </td>
                                </tr>  
                              </table>
                            </td>
                          </tr>
                      </table>
                    </center>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top" width="100%" style="background-color: #f7f7f7; height: 100px;">
                    <center>
                      <table cellspacing="0" cellpadding="0" width="600" class="w320">
                        <tr>
                          <td style="padding: 25px 0 25px">
                            <strong>Each Online</strong><br />
                            1234 eachonline St <br />
                            Wonderland <br /><br />
                          </td>
                        </tr>
                      </table>
                    </center>
                  </td>
                </tr>
              </table>
              </div>
              </body>
              </html>`
            }
          )
          this.authService.db.collection('mail').add({
            from:'ritta.keyrouz@hotmail.com',
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
