var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var CategoryListComponent = /** @class */ (function () {
    function CategoryListComponent() {
        this.change = new EventEmitter();
    }
    CategoryListComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.categories && !this.mainCategories) {
            this.mainCategories = this.categories.filter(function (category) { return category.parentId == _this.categoryParentId; });
        }
    };
    CategoryListComponent.prototype.stopClickPropagate = function (event) {
        if (window.innerWidth < 960) {
            event.stopPropagation();
            event.preventDefault();
        }
    };
    CategoryListComponent.prototype.changeCategory = function (event) {
        this.change.emit(event);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryListComponent.prototype, "categories", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CategoryListComponent.prototype, "categoryParentId", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CategoryListComponent.prototype, "change", void 0);
    CategoryListComponent = __decorate([
        Component({
            selector: 'app-category-list',
            templateUrl: './category-list.component.html',
            styleUrls: ['./category-list.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], CategoryListComponent);
    return CategoryListComponent;
}());
export { CategoryListComponent };
//# sourceMappingURL=category-list.component.js.map