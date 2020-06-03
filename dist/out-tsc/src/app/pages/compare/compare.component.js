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
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppService } from '../../app.service';
var CompareComponent = /** @class */ (function () {
    function CompareComponent(appService, afs, snackBar, authService) {
        this.appService = appService;
        this.afs = afs;
        this.snackBar = snackBar;
        this.authService = authService;
    }
    CompareComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.Data.cartList.forEach(function (cartProduct) {
            _this.authService.Data.compareList.forEach(function (product) {
                if (cartProduct.id == product.id) {
                    product.cartCount = cartProduct.cartCount;
                }
            });
        });
    };
    CompareComponent.prototype.remove = function (product) {
        var index = this.authService.Data.compareList.indexOf(product);
        if (index !== -1) {
            this.authService.Data.compareList.splice(index, 1);
            var document_1 = this.afs.collection('cart').doc("" + this.authService.user['uid']);
            document_1.update({
                compareList: this.authService.Data.compareList
            });
        }
    };
    CompareComponent.prototype.clear = function () {
        this.authService.Data.compareList.length = 0;
        var document = this.afs.collection('cart').doc("" + this.authService.user['uid']);
        document.update({
            compareList: this.authService.Data.compareList
        });
    };
    CompareComponent = __decorate([
        Component({
            selector: 'app-compare',
            templateUrl: './compare.component.html',
            styleUrls: ['./compare.component.scss']
        }),
        __metadata("design:paramtypes", [AppService, AngularFirestore, MatSnackBar, AuthService])
    ], CompareComponent);
    return CompareComponent;
}());
export { CompareComponent };
//# sourceMappingURL=compare.component.js.map