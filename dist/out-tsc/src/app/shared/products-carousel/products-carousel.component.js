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
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
var ProductsCarouselComponent = /** @class */ (function () {
    function ProductsCarouselComponent(appService, dialog, router, authService) {
        this.appService = appService;
        this.dialog = dialog;
        this.router = router;
        this.authService = authService;
        this.products = [];
        this.config = {};
    }
    ProductsCarouselComponent.prototype.ngOnInit = function () {
    };
    ProductsCarouselComponent.prototype.ngAfterViewInit = function () {
        this.config = {
            observer: true,
            slidesPerView: 6,
            spaceBetween: 16,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            breakpoints: {
                480: {
                    slidesPerView: 1
                },
                740: {
                    slidesPerView: 2,
                },
                960: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
                1500: {
                    slidesPerView: 5,
                }
            }
        };
    };
    ProductsCarouselComponent.prototype.openProductDialog = function (product) {
        var _this = this;
        var dialogRef = this.dialog.open(ProductDialogComponent, {
            data: product,
            panelClass: 'product-dialog'
        });
        dialogRef.afterClosed().subscribe(function (product) {
            if (product) {
                _this.router.navigate(['/products', product.id, product.name]);
            }
        });
    };
    __decorate([
        Input('products'),
        __metadata("design:type", Array)
    ], ProductsCarouselComponent.prototype, "products", void 0);
    ProductsCarouselComponent = __decorate([
        Component({
            selector: 'app-products-carousel',
            templateUrl: './products-carousel.component.html',
            styleUrls: ['./products-carousel.component.scss']
        }),
        __metadata("design:paramtypes", [AppService, MatDialog, Router, AuthService])
    ], ProductsCarouselComponent);
    return ProductsCarouselComponent;
}());
export { ProductsCarouselComponent };
//# sourceMappingURL=products-carousel.component.js.map