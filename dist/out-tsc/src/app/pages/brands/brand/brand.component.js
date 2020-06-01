var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../../app.service';
var BrandComponent = /** @class */ (function () {
    function BrandComponent(activatedRoute, appService, dialog, router) {
        this.activatedRoute = activatedRoute;
        this.appService = appService;
        this.dialog = dialog;
        this.router = router;
        this.sidenavOpen = true;
        this.viewType = 'grid';
        this.viewCol = 25;
        this.counts = [12, 24, 36];
        this.sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
        this.products = [];
        this.brands = [];
        this.priceFrom = 750;
        this.priceTo = 1599;
        this.colors = ["#5C6BC0", "#66BB6A", "#EF5350", "#BA68C8", "#FF4081", "#9575CD", "#90CAF9", "#B2DFDB", "#DCE775", "#FFD740", "#00E676", "#FBC02D", "#FF7043", "#F5F5F5", "#000000"];
        this.sizes = ["S", "M", "L", "XL", "2XL", "32", "36", "38", "46", "52", "13.3\"", "15.4\"", "17\"", "21\"", "23.4\""];
    }
    BrandComponent.prototype.ngOnInit = function () {
        this.count = this.counts[0];
        this.sort = this.sortings[0];
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            // console.log(params['name']);
        });
        if (window.innerWidth < 960) {
            this.sidenavOpen = false;
        }
        ;
        if (window.innerWidth < 1280) {
            this.viewCol = 33.3;
        }
        ;
        this.getCategories();
        this.getAllProducts();
    };
    BrandComponent.prototype.getAllProducts = function () {
        var _this = this;
        this.appService.getProducts("brand").subscribe(function (data) {
            _this.products = data;
            //for show more product  
            for (var index = 0; index < 3; index++) {
                _this.products = _this.products.concat(_this.products);
            }
        });
    };
    BrandComponent.prototype.getCategories = function () {
        var _this = this;
        if (this.appService.Data.categories.length == 0) {
            this.appService.getCategories().subscribe(function (data) {
                _this.categories = data;
                _this.appService.Data.categories = data;
            });
        }
        else {
            this.categories = this.appService.Data.categories;
        }
    };
    BrandComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    BrandComponent.prototype.onWindowResize = function () {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
        (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
    };
    BrandComponent.prototype.changeCount = function (count) {
        this.count = count;
        this.getAllProducts();
    };
    BrandComponent.prototype.changeSorting = function (sort) {
        this.sort = sort;
    };
    BrandComponent.prototype.changeViewType = function (viewType, viewCol) {
        this.viewType = viewType;
        this.viewCol = viewCol;
    };
    BrandComponent.prototype.openProductDialog = function (product) {
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
    BrandComponent.prototype.onPageChanged = function (event) {
        this.page = event;
        this.getAllProducts();
        window.scrollTo(0, 0);
    };
    BrandComponent.prototype.onChangeCategory = function (event) {
        if (event.target) {
            this.router.navigate(['/products', event.target.innerText.toLowerCase()]);
        }
    };
    __decorate([
        ViewChild('sidenav'),
        __metadata("design:type", Object)
    ], BrandComponent.prototype, "sidenav", void 0);
    __decorate([
        HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BrandComponent.prototype, "onWindowResize", null);
    BrandComponent = __decorate([
        Component({
            selector: 'app-brand',
            templateUrl: './brand.component.html',
            styleUrls: ['./brand.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, AppService, MatDialog, Router])
    ], BrandComponent);
    return BrandComponent;
}());
export { BrandComponent };
//# sourceMappingURL=brand.component.js.map