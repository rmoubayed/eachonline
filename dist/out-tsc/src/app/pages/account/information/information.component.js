var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
var InformationComponent = /** @class */ (function () {
    function InformationComponent(formBuilder, afs, auth, snackBar) {
        this.formBuilder = formBuilder;
        this.afs = afs;
        this.auth = auth;
        this.snackBar = snackBar;
    }
    InformationComponent.prototype.ngOnInit = function () {
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
        }, { validator: matchingPasswords('newPassword', 'confirmNewPassword') });
        if (this.user['displayName']) {
            this.infoForm.get('firstName').setValue(this.user['displayName'].split(' ')[0]);
            this.infoForm.get('lastName').setValue(this.user['displayName'].split(' ')[1]);
        }
        if (this.user['email']) {
            this.infoForm.get('email').setValue(this.user['email']);
        }
    };
    InformationComponent.prototype.onInfoFormSubmit = function (values) {
        var _this = this;
        if (this.infoForm.valid) {
            var name_1 = this.infoForm.value.firstName + ' ' + this.infoForm.value.lastName;
            console.log(name_1);
            if ((this.infoForm.value.firstName != this.user['displayName'].split(' ')[0] || this.infoForm.value.lastName != this.user['displayName'].split(' ')[1]) && this.infoForm.value.email == this.user['email']) {
                this.auth.updateProfileName(name_1);
            }
            if ((this.infoForm.value.firstName == this.user['displayName'].split(' ')[0] && this.infoForm.value.lastName == this.user['displayName'].split(' ')[1]) && this.infoForm.value.email != this.user['email']) {
                this.auth.updateUserEmail(this.infoForm.value.email);
            }
            if (this.infoForm.value.firstName != this.user['displayName'].split(' ')[0] && this.infoForm.value.lastName != this.user['displayName'].split(' ')[1] && this.infoForm.value.email != this.user['email']) {
                this.afs.collection('customer').doc(this.user['uid']).update({
                    fullName: name_1,
                    email: this.infoForm.value.email
                }).then(function () {
                    _this.auth.updateProfileName(name_1);
                    _this.auth.updateUserEmail(_this.infoForm.value.email);
                });
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
    };
    InformationComponent.prototype.onPasswordFormSubmit = function (values) {
        if (this.passwordForm.valid) {
            this.auth.resetUserPassword(this.passwordForm.value.newPassword);
        }
    };
    InformationComponent = __decorate([
        Component({
            selector: 'app-information',
            templateUrl: './information.component.html',
            styleUrls: ['./information.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder, AngularFirestore, AuthService, MatSnackBar])
    ], InformationComponent);
    return InformationComponent;
}());
export { InformationComponent };
//# sourceMappingURL=information.component.js.map