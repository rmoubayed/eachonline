var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AppService } from '../../../app.service';
import { AuthService } from 'src/app/services/auth.service';
var TopMenuComponent = /** @class */ (function () {
    function TopMenuComponent(appService, authService, router) {
        this.appService = appService;
        this.authService = authService;
        this.router = router;
        this.currencies = ['USD', 'EUR'];
        this.flags = [
            { name: 'English', image: 'assets/images/flags/gb.svg' },
            { name: 'German', image: 'assets/images/flags/de.svg' },
            { name: 'French', image: 'assets/images/flags/fr.svg' },
            { name: 'Russian', image: 'assets/images/flags/ru.svg' },
            { name: 'Turkish', image: 'assets/images/flags/tr.svg' }
        ];
    }
    TopMenuComponent.prototype.ngOnInit = function () {
        this.user = this.authService.user;
        this.data = this.authService.Data;
        this.currency = this.currencies[0];
        this.flag = this.flags[0];
    };
    TopMenuComponent.prototype.changeCurrency = function (currency) {
        this.currency = currency;
    };
    TopMenuComponent.prototype.changeLang = function (flag) {
        this.flag = flag;
    };
    TopMenuComponent.prototype.signOut = function () {
        this.authService.logout();
    };
    TopMenuComponent = __decorate([
        Component({
            selector: 'app-top-menu',
            templateUrl: './top-menu.component.html'
        }),
        __metadata("design:paramtypes", [AppService, AuthService, Router])
    ], TopMenuComponent);
    return TopMenuComponent;
}());
export { TopMenuComponent };
//# sourceMappingURL=top-menu.component.js.map