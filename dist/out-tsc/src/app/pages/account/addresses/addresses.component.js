var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';
var AddressesComponent = /** @class */ (function () {
    function AddressesComponent(appService, formBuilder, snackBar) {
        this.appService = appService;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.countries = [];
    }
    AddressesComponent.prototype.ngOnInit = function () {
        this.countries = this.appService.getCountries();
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
    };
    AddressesComponent.prototype.onBillingFormSubmit = function (values) {
        if (this.billingForm.valid) {
            this.snackBar.open('Your billing address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        }
    };
    AddressesComponent.prototype.onShippingFormSubmit = function (values) {
        if (this.shippingForm.valid) {
            this.snackBar.open('Your shipping address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        }
    };
    AddressesComponent = __decorate([
        Component({
            selector: 'app-addresses',
            templateUrl: './addresses.component.html',
            styleUrls: ['./addresses.component.scss']
        }),
        __metadata("design:paramtypes", [AppService, FormBuilder, MatSnackBar])
    ], AddressesComponent);
    return AddressesComponent;
}());
export { AddressesComponent };
//# sourceMappingURL=addresses.component.js.map