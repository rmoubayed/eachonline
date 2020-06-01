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
import { AppService } from '../../app.service';
var CompareComponent = /** @class */ (function () {
    function CompareComponent(appService, snackBar) {
        this.appService = appService;
        this.snackBar = snackBar;
    }
    CompareComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.Data.cartList.forEach(function (cartProduct) {
            _this.appService.Data.compareList.forEach(function (product) {
                if (cartProduct.id == product.id) {
                    product.cartCount = cartProduct.cartCount;
                }
            });
        });
    };
    CompareComponent.prototype.remove = function (product) {
        var index = this.appService.Data.compareList.indexOf(product);
        if (index !== -1) {
            this.appService.Data.compareList.splice(index, 1);
        }
    };
    CompareComponent.prototype.clear = function () {
        this.appService.Data.compareList.length = 0;
    };
    CompareComponent.prototype.addToCart = function (product) {
        product.cartCount = product.cartCount + 1;
        if (product.cartCount <= product.availibilityCount) {
            this.appService.addToCart(product);
        }
        else {
            product.cartCount = product.availibilityCount;
            this.snackBar.open('You can not add more items than available. In stock ' + product.availibilityCount + ' items and you already added ' + product.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        }
    };
    CompareComponent = __decorate([
        Component({
            selector: 'app-compare',
            templateUrl: './compare.component.html',
            styleUrls: ['./compare.component.scss']
        }),
        __metadata("design:paramtypes", [AppService, MatSnackBar])
    ], CompareComponent);
    return CompareComponent;
}());
export { CompareComponent };
//# sourceMappingURL=compare.component.js.map