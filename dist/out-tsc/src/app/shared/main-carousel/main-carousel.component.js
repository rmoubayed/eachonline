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
var MainCarouselComponent = /** @class */ (function () {
    function MainCarouselComponent() {
        this.slides = [];
        this.config = {};
        this.pagination = {
            el: '.swiper-pagination',
            clickable: true
        };
    }
    MainCarouselComponent.prototype.ngOnInit = function () { };
    MainCarouselComponent.prototype.ngAfterViewInit = function () {
        this.config = {
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: true,
            navigation: true,
            pagination: this.pagination,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            speed: 500,
            effect: "slide"
        };
    };
    __decorate([
        Input('slides'),
        __metadata("design:type", Array)
    ], MainCarouselComponent.prototype, "slides", void 0);
    MainCarouselComponent = __decorate([
        Component({
            selector: 'app-main-carousel',
            templateUrl: './main-carousel.component.html',
            styleUrls: ['./main-carousel.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], MainCarouselComponent);
    return MainCarouselComponent;
}());
export { MainCarouselComponent };
//# sourceMappingURL=main-carousel.component.js.map