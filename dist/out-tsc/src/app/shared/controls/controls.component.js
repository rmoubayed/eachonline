var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppService } from '../../app.service';
import { Product } from '../../app.models';
var ControlsComponent = /** @class */ (function () {
    function ControlsComponent(appService, snackBar) {
        this.appService = appService;
        this.snackBar = snackBar;
        this.onOpenProductDialog = new EventEmitter();
        this.onQuantityChange = new EventEmitter();
        this.count = 1;
        this.align = 'center center';
    }
    ControlsComponent.prototype.ngOnInit = function () {
        if (this.product) {
            if (this.product.cartCount > 0) {
                this.count = this.product.cartCount;
            }
        }
        this.layoutAlign();
    };
    ControlsComponent.prototype.layoutAlign = function () {
        if (this.type == 'all') {
            this.align = 'space-between center';
        }
        else if (this.type == 'wish') {
            this.align = 'start center';
        }
        else {
            this.align = 'center center';
        }
    };
    ControlsComponent.prototype.increment = function (count) {
        if (this.count < this.product.availibilityCount) {
            this.count++;
            var obj = {
                productId: this.product.id,
                soldQuantity: this.count,
                total: this.count * this.product.newPrice
            };
            this.changeQuantity(obj);
        }
        else {
            this.snackBar.open('You can not choose more items than available. In stock ' + this.count + ' items.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
    };
    ControlsComponent.prototype.decrement = function (count) {
        if (this.count > 1) {
            this.count--;
            var obj = {
                productId: this.product.id,
                soldQuantity: this.count,
                total: this.count * this.product.newPrice
            };
            this.changeQuantity(obj);
        }
    };
    ControlsComponent.prototype.addToCompare = function (product) {
        this.appService.addToCompare(product);
    };
    ControlsComponent.prototype.addToWishList = function (product) {
        this.appService.addToWishList(product);
    };
    ControlsComponent.prototype.addToCart = function (product) {
        // console.log(product)
        var currentProduct = this.appService.Data.cartList.filter(function (item) { return item.id == product.id; })[0];
        if (currentProduct) {
            if ((currentProduct.cartCount + this.count) <= this.product.availibilityCount) {
                product.cartCount = currentProduct.cartCount + this.count;
            }
            else {
                this.snackBar.open('You can not add more items than available. In stock ' + this.product.availibilityCount + ' items and you already added ' + currentProduct.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
                return false;
            }
        }
        else {
            product.cartCount = this.count;
        }
        this.appService.addToCart(product);
    };
    ControlsComponent.prototype.openProductDialog = function (event) {
        this.onOpenProductDialog.emit(event);
    };
    ControlsComponent.prototype.changeQuantity = function (value) {
        this.onQuantityChange.emit(value);
    };
    __decorate([
        Input(),
        __metadata("design:type", Product)
    ], ControlsComponent.prototype, "product", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ControlsComponent.prototype, "type", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ControlsComponent.prototype, "onOpenProductDialog", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ControlsComponent.prototype, "onQuantityChange", void 0);
    ControlsComponent = __decorate([
        Component({
            selector: 'app-controls',
            templateUrl: './controls.component.html',
            styleUrls: ['./controls.component.scss']
        }),
        __metadata("design:paramtypes", [AppService, MatSnackBar])
    ], ControlsComponent);
    return ControlsComponent;
}());
export { ControlsComponent };
//# sourceMappingURL=controls.component.js.map