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
var BrandsComponent = /** @class */ (function () {
    function BrandsComponent(appService) {
        this.appService = appService;
        this.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "V", "W", "Y", "Z"];
        this.brands = [];
    }
    BrandsComponent.prototype.ngOnInit = function () {
        this.brands = this.appService.getBrands();
        // this.brands.sort((a, b)=>{
        //   if(a.name < b.name) return -1;
        //   if(a.name > b.name) return 1;
        //   return 0;
        // });
    };
    BrandsComponent = __decorate([
        Component({
            selector: 'app-brands',
            templateUrl: './brands.component.html',
            styleUrls: ['./brands.component.scss']
        }),
        __metadata("design:paramtypes", [AppService])
    ], BrandsComponent);
    return BrandsComponent;
}());
export { BrandsComponent };
//# sourceMappingURL=brands.component.js.map