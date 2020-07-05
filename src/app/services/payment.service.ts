import { element } from 'protractor';

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare var Stripe;

export interface PayPalProduct {
  name:string;
  quantity: string;
  category: string;
  unit_amount: UnitAmount
}
export interface StripeProduct {
  name: string;
  id: string;
}
export interface StripePrice {
  product: string;
  unit_amount: string;
  currency: string;
}
export interface UnitAmount {
  currency_code: string;
  value: string;
}
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentInProgress: boolean;
  paymentSuccess: boolean;
  stripe = Stripe('pk_test_87BwEuXGojRCF1iXMHi20m0X000mIixiCM');
  // Set up Stripe.js and Elements to use in checkout form
 
  card : any;
  elementStyles = {
    base: {
      color: '#fff',
      fontWeight: 600,
      fontSize: '16px',

      ':focus': {
        color: '#424770',
      },

      '::placeholder': {
        color: 'lightGray',
      },

      ':focus::placeholder': {
        color: 'lightGray',
      },
    },
    invalid: {
      color: '#fff',
      ':focus': {
        color: '#FA755A',
      },
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  };

  elementClasses = {
    focus: 'focus',
    empty: 'empty',
    invalid: 'invalid',
  };
  cardExpiry: any;
  cardNumber: any;
  cardCvc: any;
  form: HTMLFormElement;
  errorMessage: any;
  error: any;
  savedErrors = {};
  


  
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, 
    private auth : AuthService, public router:Router,
    private http :HttpClient) { }

  mountPayment() {
  let elements = this.stripe.elements();
  var style = {
    base: {
      color: "#32325d"
    }
  }

  this.card = elements.create("card", { style: style });
  this.card.mount("#card-element");

  this.card.addEventListener('change', ({error}) => {
    const displayError = document.getElementById('card-errors');
    if (error) {
      displayError.textContent = error.message;
    } else {
      displayError.textContent = '';
    }
  });
    // this.card = elements.create([this.cardNumber, this.cardExpiry, this.cardCvc], 'example3');
    // this.card.mount("#example-3");

    // this.card.addEventListener('change', ({error}) => {
    //     const displayError = document.getElementById('card-errors');
    //     if (error) {
    //       displayError.textContent = error.message;
    //     } else {
    //       displayError.textContent = '';
    //     }
    // });
  }
  processOrderPaymentData(products) : any[] {
      let paypalProducts : PayPalProduct[] = []
      products.forEach(product => {
        let paypalProduct : PayPalProduct = {
          quantity: product.cartCount+'',
          unit_amount: {
            currency_code: 'USD',
            value: product.newPrice+''
          },
          category: 'DIGITAL_GOODS',
          name: product.name
        }
        paypalProducts.push(paypalProduct)
      })
      return paypalProducts
  }
  // registerElements(elements, exampleName) {
  //   var formClass = '.' + exampleName;
  //   var example = document.querySelector(formClass);
  //   this.form = example.querySelector('.stripe-form');
    
  //   // Listen for errors from each Element, and show error messages in the UI.
    
  //   elements.forEach(function(element, id) {
  //     console.log(element, id)
  //     element.on('change', function(event) {
  //       let displayError = document.getElementById('card-errors');
  //       if (event.error) {
  //         displayError.textContent = event.error.message;
  //       } else {
  //         displayError.textContent = '';
  //       }
  //     });
  //   });
  
  //   this.form.addEventListener('submit', function(e) {
  //     e.preventDefault();
  
  //     // Trigger HTML5 validation UI on the form if any of the inputs fail
  //     // validation.
  //     var plainInputsValid = true;
  //     Array.prototype.forEach.call(this.form.querySelectorAll('input'), function(
  //       input
  //     ) {
  //       if (input.checkValidity && !input.checkValidity()) {
  //         plainInputsValid = false;
  //         return;
  //       }
  //     });
  //     if (!plainInputsValid) {
  //       this.triggerBrowserValidation();
  //       return;
  //     }
  
  //     // Show a loading screen...
  //     example.classList.add('submitting');
  
  //     // Disable all inputs.
  //     this.disableInputs();
  
  
  //     // Use Stripe.js to create a token. We only need to pass in one Element
  //     // from the Element group in order to create a token. We can also pass
  //     // in the additional customer data we collected in our form.
  //     this.stripe.createToken(elements[0]).then(function(result) {
  //       // Stop loading!
  //       example.classList.remove('submitting');
  
  //       if (result.token) {
  //         // If we received a token, show the token ID.
  //         example.querySelector('.token').innerHTML = result.token.id;
  //         example.classList.add('submitted');
  //       } else {
  //         // Otherwise, un-disable inputs.
  //         this.enableInputs();
  //       }
  //     });
  //   });
  
    
  // }
  // enableInputs() {
  //   Array.prototype.forEach.call(
  //     this.form.querySelectorAll(
  //       "input[type='text'], input[type='email'], input[type='tel']"
  //     ),
  //     function(input) {
  //       input.removeAttribute('disabled');
  //     }
  //   );
  // }

  // disableInputs(){
  //   Array.prototype.forEach.call(
  //     this.form.querySelectorAll(
  //       "input[type='text'], input[type='email'], input[type='tel']"
  //     ),
  //     function(input) {
  //       input.setAttribute('disabled', 'true');
  //     }
  //   );
  // }

  triggerBrowserValidation() {
    // The only way to trigger HTML5 form validation UI is to fake a user submit
    // event.
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.display = 'none';
    this.form.appendChild(submit);
    submit.click();
    submit.remove();
  }
  
  processPayment(products) {
    return new Promise( (resolve, reject) => {
      // this.afs.collection(`payments/`)
      let body = {products: products};
      this.paymentInProgress = true;
      this.http.post(this.auth.apiUrl+'orderStripePayment', body).pipe(
        map((response) => {
            console.log(response);
            var clientSecret = response['client_secret'];
            console.log('CLIENT SECRETTT', clientSecret);
            // Call stripe.confirmCardPayment() with the client secret.
           this.stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: this.card,
                billing_details: {
                  name: this.auth.user['email']
                }
              }
            }).then((result) => {
              if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                console.log(result.error.message);
                reject(result.error.message);
              } else {
                if (result.paymentIntent.status === 'succeeded') {
                  console.log('payment success!!!');
                  resolve(result);
                }
              }
            });
          })).subscribe()
    })
  }
}
