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
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AuthService } from 'src/app/services/auth.service';
var SignInComponent = /** @class */ (function () {
    function SignInComponent(formBuilder, router, snackBar, authService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.snackBar = snackBar;
        this.authService = authService;
    }
    SignInComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            'email': ['', Validators.compose([Validators.required, emailValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.registerForm = this.formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            'email': ['', Validators.compose([Validators.required, emailValidator])],
            'password': ['', Validators.required],
            'confirmPassword': ['', Validators.required]
        }, { validator: matchingPasswords('password', 'confirmPassword') });
    };
    SignInComponent.prototype.onLoginFormSubmit = function (values) {
        if (this.loginForm.valid) {
            this.authService.login(values);
            this.router.navigate(['/']);
        }
        else {
            //error code
        }
    };
    SignInComponent.prototype.loginWithGoogle = function () {
        this.authService.doGoogleLogin();
    };
    SignInComponent.prototype.loginWithFacebook = function () {
        this.authService.doFacebookLogin();
    };
    SignInComponent.prototype.onRegisterFormSubmit = function (values) {
        if (this.registerForm.valid) {
            this.authService.register(values);
            this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        }
    };
    SignInComponent = __decorate([
        Component({
            selector: 'app-sign-in',
            templateUrl: './sign-in.component.html',
            styleUrls: ['./sign-in.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            MatSnackBar,
            AuthService])
    ], SignInComponent);
    return SignInComponent;
}());
export { SignInComponent };
//# sourceMappingURL=sign-in.component.js.map