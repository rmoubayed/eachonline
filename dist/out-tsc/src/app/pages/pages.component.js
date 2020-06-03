var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../app.settings';
import { AppService } from '../app.service';
import { SidenavMenuService } from '../theme/components/sidenav-menu/sidenav-menu.service';
import { AuthService } from '../services/auth.service';
var PagesComponent = /** @class */ (function () {
    function PagesComponent(appSettings, appService, afs, authService, sidenavMenuService, router) {
        this.appSettings = appSettings;
        this.appService = appService;
        this.afs = afs;
        this.authService = authService;
        this.sidenavMenuService = sidenavMenuService;
        this.router = router;
        this.showBackToTop = false;
        this.settings = this.appSettings.settings;
    }
    PagesComponent.prototype.ngOnInit = function () {
        this.data = this.authService.Data;
        this.user = this.authService.user;
        console.log(this.authService.Data, 'dataaa ');
        this.getCategories();
        this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
    };
    PagesComponent.prototype.getCategories = function () {
        var _this = this;
        this.appService.getCategories().subscribe(function (data) {
            _this.categories = data;
            _this.category = data[0];
            _this.authService.Data.categories = data;
        });
    };
    PagesComponent.prototype.changeCategory = function (event) {
        if (event.target) {
            this.category = this.categories.filter(function (category) { return category.name == event.target.innerText; })[0];
        }
        if (window.innerWidth < 960) {
            this.stopClickPropagate(event);
        }
    };
    PagesComponent.prototype.remove = function (product) {
        var index = this.authService.Data.cartList.indexOf(product);
        if (index !== -1) {
            this.authService.Data.cartList.splice(index, 1);
            this.authService.Data.totalPrice = this.authService.Data.totalPrice - product.newPrice * product.cartCount;
            this.authService.Data.totalCartCount = this.authService.Data.totalCartCount - product.cartCount;
            this.authService.resetProductCartCount(product);
            var document_1 = this.afs.collection('cart').doc("" + this.authService.user['uid']);
            document_1.update({
                products: this.authService.Data.cartList,
                totalPrice: this.authService.Data.totalPrice,
                totalCartCount: this.authService.Data.totalCartCount
            });
        }
    };
    PagesComponent.prototype.clear = function () {
        var _this = this;
        this.authService.Data.cartList.forEach(function (product) {
            _this.authService.resetProductCartCount(product);
        });
        this.authService.Data.cartList.length = 0;
        this.authService.Data.totalPrice = 0;
        this.authService.Data.totalCartCount = 0;
        var document = this.afs.collection('cart').doc("" + this.authService.user['uid']);
        document.update({
            products: this.authService.Data.cartList,
            totalPrice: this.authService.Data.totalPrice,
            totalCartCount: this.authService.Data.totalCartCount
        });
    };
    PagesComponent.prototype.changeTheme = function (theme) {
        this.settings.theme = theme;
    };
    PagesComponent.prototype.stopClickPropagate = function (event) {
        event.stopPropagation();
        event.preventDefault();
    };
    PagesComponent.prototype.search = function () { };
    PagesComponent.prototype.scrollToTop = function () {
        var scrollDuration = 200;
        var scrollStep = -window.pageYOffset / (scrollDuration / 20);
        var scrollInterval = setInterval(function () {
            if (window.pageYOffset != 0) {
                window.scrollBy(0, scrollStep);
            }
            else {
                clearInterval(scrollInterval);
            }
        }, 10);
        if (window.innerWidth <= 768) {
            setTimeout(function () { window.scrollTo(0, 0); });
        }
    };
    PagesComponent.prototype.onWindowScroll = function ($event) {
        ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;
    };
    PagesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationEnd) {
                _this.sidenav.close();
            }
        });
        this.sidenavMenuService.expandActiveSubMenu(this.sidenavMenuService.getSidenavMenuItems());
    };
    PagesComponent.prototype.closeSubMenus = function () {
        if (window.innerWidth < 960) {
            this.sidenavMenuService.closeAllSubMenus();
        }
    };
    __decorate([
        ViewChild('sidenav'),
        __metadata("design:type", Object)
    ], PagesComponent.prototype, "sidenav", void 0);
    __decorate([
        HostListener('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], PagesComponent.prototype, "onWindowScroll", null);
    PagesComponent = __decorate([
        Component({
            selector: 'app-pages',
            templateUrl: './pages.component.html',
            styleUrls: ['./pages.component.scss'],
            providers: [SidenavMenuService]
        }),
        __metadata("design:paramtypes", [AppSettings,
            AppService,
            AngularFirestore,
            AuthService,
            SidenavMenuService,
            Router])
    ], PagesComponent);
    return PagesComponent;
}());
export { PagesComponent };
//# sourceMappingURL=pages.component.js.map