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
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
var InformationComponent = /** @class */ (function () {
    function InformationComponent(formBuilder, snackBar) {
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
    }
    InformationComponent.prototype.ngOnInit = function () {
        this.infoForm = this.formBuilder.group({
            'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'email': ['', Validators.compose([Validators.required, emailValidator])]
        });
        this.passwordForm = this.formBuilder.group({
            'currentPassword': ['', Validators.required],
            'newPassword': ['', Validators.required],
            'confirmNewPassword': ['', Validators.required]
        }, { validator: matchingPasswords('newPassword', 'confirmNewPassword') });
    };
    InformationComponent.prototype.onInfoFormSubmit = function (values) {
        if (this.infoForm.valid) {
            this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        }
    };
    InformationComponent.prototype.onPasswordFormSubmit = function (values) {
        if (this.passwordForm.valid) {
            this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        }
    };
    InformationComponent = __decorate([
        Component({
            selector: 'app-information',
            templateUrl: './information.component.html',
            styleUrls: ['./information.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder, MatSnackBar])
    ], InformationComponent);
    return InformationComponent;
}());
export { InformationComponent };
//# sourceMappingURL=information.component.js.map