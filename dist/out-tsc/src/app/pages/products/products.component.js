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
import { Component, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(activatedRoute, authService, appService, dialog, router) {
        this.activatedRoute = activatedRoute;
        this.authService = authService;
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
    ProductsComponent.prototype.ngOnInit = function () {
        this.count = this.counts[0];
        this.sort = this.sortings[0];
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            //console.log(params['name']);
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
        this.getBrands();
        this.getAllProducts();
    };
    ProductsComponent.prototype.getAllProducts = function () {
        var _this = this;
        this.appService.getProducts("featured").subscribe(function (data) {
            _this.products = data;
            //for show more product  
            for (var index = 0; index < 3; index++) {
                _this.products = _this.products.concat(_this.products);
            }
        });
    };
    ProductsComponent.prototype.getCategories = function () {
        var _this = this;
        if (this.authService.Data.categories.length == 0) {
            this.appService.getCategories().subscribe(function (data) {
                _this.categories = data;
                _this.authService.Data.categories = data;
            });
        }
        else {
            this.categories = this.authService.Data.categories;
        }
    };
    ProductsComponent.prototype.getBrands = function () {
        this.brands = this.appService.getBrands();
    };
    ProductsComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProductsComponent.prototype.onWindowResize = function () {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
        (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
    };
    ProductsComponent.prototype.changeCount = function (count) {
        this.count = count;
        this.getAllProducts();
    };
    ProductsComponent.prototype.changeSorting = function (sort) {
        this.sort = sort;
    };
    ProductsComponent.prototype.changeViewType = function (viewType, viewCol) {
        this.viewType = viewType;
        this.viewCol = viewCol;
    };
    ProductsComponent.prototype.openProductDialog = function (product) {
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
    ProductsComponent.prototype.onPageChanged = function (event) {
        this.page = event;
        this.getAllProducts();
        window.scrollTo(0, 0);
    };
    ProductsComponent.prototype.onChangeCategory = function (event) {
        if (event.target) {
            this.router.navigate(['/products', event.target.innerText.toLowerCase()]);
        }
    };
    __decorate([
        ViewChild('sidenav'),
        __metadata("design:type", Object)
    ], ProductsComponent.prototype, "sidenav", void 0);
    __decorate([
        HostListener('window:resize'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], ProductsComponent.prototype, "onWindowResize", null);
    ProductsComponent = __decorate([
        Component({
            selector: 'app-products',
            templateUrl: './products.component.html',
            styleUrls: ['./products.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, AuthService, AppService, MatDialog, Router])
    ], ProductsComponent);
    return ProductsComponent;
}());
export { ProductsComponent };
//# sourceMappingURL=products.component.js.map