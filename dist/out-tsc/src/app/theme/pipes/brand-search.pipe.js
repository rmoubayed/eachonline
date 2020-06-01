var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var BrandSearchPipe = /** @class */ (function () {
    function BrandSearchPipe() {
    }
    BrandSearchPipe.prototype.transform = function (brands, args) {
        var searchText = new RegExp(args, 'ig');
        if (brands) {
            return brands.filter(function (brand) {
                if (brand.name) {
                    return brand.name.search(searchText) !== -1;
                }
            });
        }
    };
    BrandSearchPipe = __decorate([
        Pipe({ name: 'brandSearchPipe', pure: false })
    ], BrandSearchPipe);
    return BrandSearchPipe;
}());
export { BrandSearchPipe };
//# sourceMappingURL=brand-search.pipe.js.map