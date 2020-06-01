var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { AppService } from '../../app.service';
var CheckoutComponent = /** @class */ (function () {
    function CheckoutComponent(appService, formBuilder) {
        this.appService = appService;
        this.formBuilder = formBuilder;
        this.countries = [];
        this.months = [];
        this.years = [];
        this.deliveryMethods = [];
        this.grandTotal = 0;
    }
    CheckoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.Data.cartList.forEach(function (product) {
            _this.grandTotal += product.cartCount * product.newPrice;
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
            country: ['', Validators.required],
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
    };
    CheckoutComponent.prototype.placeOrder = function () {
        this.horizontalStepper._steps.forEach(function (step) { return step.editable = false; });
        this.verticalStepper._steps.forEach(function (step) { return step.editable = false; });
        this.appService.Data.cartList.length = 0;
        this.appService.Data.totalPrice = 0;
        this.appService.Data.totalCartCount = 0;
    };
    __decorate([
        ViewChild('horizontalStepper'),
        __metadata("design:type", MatStepper)
    ], CheckoutComponent.prototype, "horizontalStepper", void 0);
    __decorate([
        ViewChild('verticalStepper'),
        __metadata("design:type", MatStepper)
    ], CheckoutComponent.prototype, "verticalStepper", void 0);
    CheckoutComponent = __decorate([
        Component({
            selector: 'app-checkout',
            templateUrl: './checkout.component.html',
            styleUrls: ['./checkout.component.scss']
        }),
        __metadata("design:paramtypes", [AppService, FormBuilder])
    ], CheckoutComponent);
    return CheckoutComponent;
}());
export { CheckoutComponent };
//# sourceMappingURL=checkout.component.js.map