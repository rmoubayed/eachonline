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
import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { AngularFirestore } from '@angular/fire/firestore';
var CartComponent = /** @class */ (function () {
    function CartComponent(appService, afs, authService) {
        this.appService = appService;
        this.afs = afs;
        this.authService = authService;
        this.total = [];
        this.grandTotal = 0;
        this.cartItemCount = [];
        this.cartItemCountTotal = 0;
    }
    CartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.Data.cartList.forEach(function (product) {
            console.log(product, 'productttt');
            _this.total[product.id] = product.cartCount * product.newPrice;
            _this.grandTotal += product.cartCount * product.newPrice;
            _this.cartItemCount[product.id] = product.cartCount;
            _this.cartItemCountTotal += product.cartCount;
            console.log(_this.total, _this.grandTotal, _this.cartItemCount, _this.cartItemCountTotal);
        });
        console.log(this.authService.Data);
    };
    CartComponent.prototype.updateCart = function (value) {
        var _this = this;
        console.log(value);
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
            this.authService.Data.totalPrice = this.grandTotal;
            this.authService.Data.totalCartCount = this.cartItemCountTotal;
            this.authService.Data.cartList.forEach(function (product) {
                _this.cartItemCount.forEach(function (count, index) {
                    if (product.id == index) {
                        product.cartCount = count;
                    }
                    if (product.id == value.productId) {
                        var size = product['selectedSize'][0];
                    }
                });
            });
            var document_1 = this.afs.collection('cart').doc("" + this.authService.user['uid']);
            document_1.update({
                products: this.authService.Data.cartList,
                totalPrice: this.authService.Data.totalPrice,
                totalCartCount: this.authService.Data.totalCartCount
            });
        }
    };
    CartComponent.prototype.remove = function (product) {
        var _this = this;
        var index = this.authService.Data.cartList.indexOf(product);
        if (index !== -1) {
            this.authService.Data.cartList.splice(index, 1);
            this.grandTotal = this.grandTotal - this.total[product.id];
            this.authService.Data.totalPrice = this.grandTotal;
            this.total.forEach(function (val) {
                if (val == _this.total[product.id]) {
                    _this.total[product.id] = 0;
                }
            });
            this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[product.id];
            this.authService.Data.totalCartCount = this.cartItemCountTotal;
            this.cartItemCount.forEach(function (val) {
                if (val == _this.cartItemCount[product.id]) {
                    _this.cartItemCount[product.id] = 0;
                }
            });
            this.afs.collection('cart').doc(this.authService.user['uid']).update({
                products: this.authService.Data.cartList,
                totalPrice: this.authService.Data.totalPrice,
                totalCartCount: this.authService.Data.totalCartCount
            });
            this.authService.resetProductCartCount(product);
        }
    };
    CartComponent.prototype.clear = function () {
        var _this = this;
        this.authService.Data.cartList.forEach(function (product) {
            _this.authService.resetProductCartCount(product);
        });
        this.authService.Data.cartList.length = 0;
        this.authService.Data.totalPrice = 0;
        this.authService.Data.totalCartCount = 0;
        this.afs.collection('cart').doc(this.authService.user['uid']).update({
            products: this.authService.Data.cartList,
            totalPrice: this.authService.Data.totalPrice,
            totalCartCount: this.authService.Data.totalCartCount
        });
    };
    CartComponent = __decorate([
        Component({
            selector: 'app-cart',
            templateUrl: './cart.component.html',
            styleUrls: ['./cart.component.scss']
        }),
        __metadata("design:paramtypes", [AppService, AngularFirestore, AuthService])
    ], CartComponent);
    return CartComponent;
}());
export { CartComponent };
//# sourceMappingURL=cart.component.js.map