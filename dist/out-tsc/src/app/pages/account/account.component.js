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
import { Component, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
var AccountComponent = /** @class */ (function () {
    function AccountComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.sidenavOpen = true;
        this.links = [
            { name: 'Account Dashboard', href: 'dashboard', icon: 'dashboard' },
            { name: 'Account Information', href: 'information', icon: 'info' },
            { name: 'Addresses', href: 'addresses', icon: 'location_on' },
            { name: 'Order History', href: 'orders', icon: 'add_shopping_cart' },
            { name: 'Logout', icon: 'power_settings_new' },
        ];
    }
    AccountComponent.prototype.ngOnInit = function () {
        if (window.innerWidth < 960) {
            this.sidenavOpen = false;
        }
        ;
    };
    AccountComponent.prototype.onWindowResize = function () {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    };
    AccountComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                if (window.innerWidth < 960) {
                    _this.sidenav.close();
                }
            }
        });
    };
    AccountComponent.prototype.logout = function () {
        this.authService.logout();
    };
    __decorate([
        ViewChild('sidenav'),
        __metadata("design:type", Object)
    ], AccountComponent.prototype, "sidenav", void 0);
    __decorate([
        HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], AccountComponent.prototype, "onWindowResize", null);
    AccountComponent = __decorate([
        Component({
            selector: 'app-account',
            templateUrl: './account.component.html',
            styleUrls: ['./account.component.scss']
        }),
        __metadata("design:paramtypes", [Router,
            AuthService])
    ], AccountComponent);
    return AccountComponent;
}());
export { AccountComponent };
//# sourceMappingURL=account.component.js.map