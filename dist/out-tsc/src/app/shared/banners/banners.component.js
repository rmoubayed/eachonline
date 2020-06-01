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
var BannersComponent = /** @class */ (function () {
    function BannersComponent() {
        this.banners = [];
    }
    BannersComponent.prototype.ngOnInit = function () { };
    BannersComponent.prototype.getBanner = function (index) {
        return this.banners[index];
    };
    BannersComponent.prototype.getBgImage = function (index) {
        var bgImage = {
            'background-image': index != null ? "url(" + this.banners[index].image + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
        };
        return bgImage;
    };
    __decorate([
        Input('banners'),
        __metadata("design:type", Array)
    ], BannersComponent.prototype, "banners", void 0);
    BannersComponent = __decorate([
        Component({
            selector: 'app-banners',
            templateUrl: './banners.component.html',
            styleUrls: ['./banners.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], BannersComponent);
    return BannersComponent;
}());
export { BannersComponent };
//# sourceMappingURL=banners.component.js.map