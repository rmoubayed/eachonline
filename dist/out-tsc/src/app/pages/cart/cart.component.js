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
import { AppService } from '../../app.service';
var CartComponent = /** @class */ (function () {
    function CartComponent(appService) {
        this.appService = appService;
        this.total = [];
        this.grandTotal = 0;
        this.cartItemCount = [];
        this.cartItemCountTotal = 0;
    }
    CartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.Data.cartList.forEach(function (product) {
            _this.total[product.id] = product.cartCount * product.newPrice;
            _this.grandTotal += product.cartCount * product.newPrice;
            _this.cartItemCount[product.id] = product.cartCount;
            _this.cartItemCountTotal += product.cartCount;
        });
    };
    CartComponent.prototype.updateCart = function (value) {
        var _this = this;
        if (value) {
            this.total[value.productId] = value.total;
            this.cartItemCount[value.productId] = value.soldQuantity;
            this.grandTotal = 0;
            this.total.forEach(function (price) {
                _this.grandTotal += price;
            });
            this.cartItemCountTotal = 0;
            this.cartItemCount.forEach(function (count) {
                _this.cartItemCountTotal += count;
            });
            this.appService.Data.totalPrice = this.grandTotal;
            this.appService.Data.totalCartCount = this.cartItemCountTotal;
            this.appService.Data.cartList.forEach(function (product) {
                _this.cartItemCount.forEach(function (count, index) {
                    if (product.id == index) {
                        product.cartCount = count;
                    }
                });
            });
        }
    };
    CartComponent.prototype.remove = function (product) {
        var _this = this;
        var index = this.appService.Data.cartList.indexOf(product);
        if (index !== -1) {
            this.appService.Data.cartList.splice(index, 1);
            this.grandTotal = this.grandTotal - this.total[product.id];
            this.appService.Data.totalPrice = this.grandTotal;
            this.total.forEach(function (val) {
                if (val == _this.total[product.id]) {
                    _this.total[product.id] = 0;
                }
            });
            this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[product.id];
            this.appService.Data.totalCartCount = this.cartItemCountTotal;
            this.cartItemCount.forEach(function (val) {
                if (val == _this.cartItemCount[product.id]) {
                    _this.cartItemCount[product.id] = 0;
                }
            });
            this.appService.resetProductCartCount(product);
        }
    };
    CartComponent.prototype.clear = function () {
        var _this = this;
        this.appService.Data.cartList.forEach(function (product) {
            _this.appService.resetProductCartCount(product);
        });
        this.appService.Data.cartList.length = 0;
        this.appService.Data.totalPrice = 0;
        this.appService.Data.totalCartCount = 0;
    };
    CartComponent = __decorate([
        Component({
            selector: 'app-cart',
            templateUrl: './cart.component.html',
            styleUrls: ['./cart.component.scss']
        }),
        __metadata("design:paramtypes", [AppService])
    ], CartComponent);
    return CartComponent;
}());
export { CartComponent };
//# sourceMappingURL=cart.component.js.map