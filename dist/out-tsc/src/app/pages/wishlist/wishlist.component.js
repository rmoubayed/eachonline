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
var WishlistComponent = /** @class */ (function () {
    function WishlistComponent(appService, snackBar) {
        this.appService = appService;
        this.snackBar = snackBar;
        this.quantity = 1;
    }
    WishlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.Data.cartList.forEach(function (cartProduct) {
            _this.appService.Data.wishList.forEach(function (product) {
                if (cartProduct.id == product.id) {
                    product.cartCount = cartProduct.cartCount;
                }
            });
        });
    };
    WishlistComponent.prototype.remove = function (product) {
        var index = this.appService.Data.wishList.indexOf(product);
        if (index !== -1) {
            this.appService.Data.wishList.splice(index, 1);
        }
    };
    WishlistComponent.prototype.clear = function () {
        this.appService.Data.wishList.length = 0;
    };
    WishlistComponent.prototype.getQuantity = function (val) {
        this.quantity = val.soldQuantity;
    };
    WishlistComponent.prototype.addToCart = function (product) {
        var currentProduct = this.appService.Data.cartList.filter(function (item) { return item.id == product.id; })[0];
        if (currentProduct) {
            if ((currentProduct.cartCount + this.quantity) <= product.availibilityCount) {
                product.cartCount = currentProduct.cartCount + this.quantity;
            }
            else {
                this.snackBar.open('You can not add more items than available. In stock ' + product.availibilityCount + ' items and you already added ' + currentProduct.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
                return false;
            }
        }
        else {
            product.cartCount = this.quantity;
        }
        this.appService.addToCart(product);
    };
    WishlistComponent = __decorate([
        Component({
            selector: 'app-wishlist',
            templateUrl: './wishlist.component.html',
            styleUrls: ['./wishlist.component.scss']
        }),
        __metadata("design:paramtypes", [AppService, MatSnackBar])
    ], WishlistComponent);
    return WishlistComponent;
}());
export { WishlistComponent };
//# sourceMappingURL=wishlist.component.js.map