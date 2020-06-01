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
var HomeComponent = /** @class */ (function () {
    function HomeComponent(appService) {
        this.appService = appService;
        this.slides = [
            { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner1.jpg' },
            { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner2.jpg' },
            { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner3.jpg' },
            { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner4.jpg' },
            { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner5.jpg' }
        ];
        this.brands = [];
        this.banners = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getBanners();
        this.getProducts("featured");
        this.getBrands();
    };
    HomeComponent.prototype.onLinkClick = function (e) {
        this.getProducts(e.tab.textLabel.toLowerCase());
    };
    HomeComponent.prototype.getProducts = function (type) {
        var _this = this;
        if (type == "featured" && !this.featuredProducts) {
            this.appService.getProducts("featured").subscribe(function (data) {
                _this.featuredProducts = data;
            });
        }
        if (type == "on sale" && !this.onSaleProducts) {
            this.appService.getProducts("on-sale").subscribe(function (data) {
                _this.onSaleProducts = data;
            });
        }
        if (type == "top rated" && !this.topRatedProducts) {
            this.appService.getProducts("top-rated").subscribe(function (data) {
                _this.topRatedProducts = data;
            });
        }
        if (type == "new arrivals" && !this.newArrivalsProducts) {
            this.appService.getProducts("new-arrivals").subscribe(function (data) {
                _this.newArrivalsProducts = data;
            });
        }
    };
    HomeComponent.prototype.getBanners = function () {
        var _this = this;
        this.appService.getBanners().subscribe(function (data) {
            _this.banners = data;
        });
    };
    HomeComponent.prototype.getBrands = function () {
        this.brands = this.appService.getBrands();
    };
    HomeComponent = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        }),
        __metadata("design:paramtypes", [AppService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map