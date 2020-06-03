var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { AuthService } from 'src/app/services/auth.service';
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../../../app.service';
import { Product } from '../../../app.models';
var ProductDialogComponent = /** @class */ (function () {
    function ProductDialogComponent(appService, authService, dialogRef, product) {
        this.appService = appService;
        this.authService = authService;
        this.dialogRef = dialogRef;
        this.product = product;
        this.config = {};
    }
    ProductDialogComponent.prototype.ngOnInit = function () { };
    ProductDialogComponent.prototype.ngAfterViewInit = function () {
        this.config = {
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            }
        };
    };
    ProductDialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    ProductDialogComponent = __decorate([
        Component({
            selector: 'app-product-dialog',
            templateUrl: './product-dialog.component.html',
            styleUrls: ['./product-dialog.component.scss'],
            encapsulation: ViewEncapsulation.None
        }),
        __param(3, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [AppService,
            AuthService,
            MatDialogRef,
            Product])
    ], ProductDialogComponent);
    return ProductDialogComponent;
}());
export { ProductDialogComponent };
//# sourceMappingURL=product-dialog.component.js.map