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
var RatingComponent = /** @class */ (function () {
    function RatingComponent() {
    }
    RatingComponent.prototype.ngDoCheck = function () {
        if (this.ratingsCount && this.ratingsValue && !this.avg) {
            this.calculateAvgValue();
        }
    };
    RatingComponent.prototype.rate = function (value) {
        // value = (value + 1)*20;
        // this.ratingsCount++;
        // this.ratingsValue = this.ratingsValue + value;
        // this.calculateAvgValue();
    };
    RatingComponent.prototype.calculateAvgValue = function () {
        this.avg = this.ratingsValue / this.ratingsCount;
        switch (true) {
            case this.avg > 0 && this.avg < 20: {
                this.stars = ['star_half', 'star_border', 'star_border', 'star_border', 'star_border'];
                break;
            }
            case this.avg == 20: {
                this.stars = ['star', 'star_border', 'star_border', 'star_border', 'star_border'];
                break;
            }
            case this.avg > 20 && this.avg < 40: {
                this.stars = ['star', 'star_half', 'star_border', 'star_border', 'star_border'];
                break;
            }
            case this.avg == 40: {
                this.stars = ['star', 'star', 'star_border', 'star_border', 'star_border'];
                break;
            }
            case this.avg > 40 && this.avg < 60: {
                this.stars = ['star', 'star', 'star_half', 'star_border', 'star_border'];
                break;
            }
            case this.avg == 60: {
                this.stars = ['star', 'star', 'star', 'star_border', 'star_border'];
                break;
            }
            case this.avg > 60 && this.avg < 80: {
                this.stars = ['star', 'star', 'star', 'star_half', 'star_border'];
                break;
            }
            case this.avg == 80: {
                this.stars = ['star', 'star', 'star', 'star', 'star_border'];
                break;
            }
            case this.avg > 80 && this.avg < 100: {
                this.stars = ['star', 'star', 'star', 'star', 'star_half'];
                break;
            }
            case this.avg >= 100: {
                this.stars = ['star', 'star', 'star', 'star', 'star'];
                break;
            }
            default: {
                this.stars = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];
                break;
            }
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], RatingComponent.prototype, "ratingsCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], RatingComponent.prototype, "ratingsValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], RatingComponent.prototype, "direction", void 0);
    RatingComponent = __decorate([
        Component({
            selector: 'app-rating',
            templateUrl: './rating.component.html',
            styleUrls: ['./rating.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], RatingComponent);
    return RatingComponent;
}());
export { RatingComponent };
//# sourceMappingURL=rating.component.js.map