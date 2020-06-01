var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
var BrandsCarouselComponent = /** @class */ (function () {
    function BrandsCarouselComponent() {
        this.brands = [];
        this.config = {};
    }
    BrandsCarouselComponent.prototype.ngAfterViewInit = function () {
        this.config = {
            slidesPerView: 7,
            spaceBetween: 16,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: true,
            preloadImages: false,
            lazy: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            speed: 500,
            effect: "slide",
            breakpoints: {
                320: {
                    slidesPerView: 1
                },
                480: {
                    slidesPerView: 2
                },
                600: {
                    slidesPerView: 3,
                },
                960: {
                    slidesPerView: 4,
                },
                1280: {
                    slidesPerView: 5,
                },
                1500: {
                    slidesPerView: 6,
                }
            }
        };
    };
    __decorate([
        Input('brands'),
        __metadata("design:type", Array)
    ], BrandsCarouselComponent.prototype, "brands", void 0);
    BrandsCarouselComponent = __decorate([
        Component({
            selector: 'app-brands-carousel',
            templateUrl: './brands-carousel.component.html',
            styleUrls: ['./brands-carousel.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], BrandsCarouselComponent);
    return BrandsCarouselComponent;
}());
export { BrandsCarouselComponent };
//# sourceMappingURL=brands-carousel.component.js.map