var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CompareComponent } from './compare.component';
export var routes = [
    { path: '', component: CompareComponent, pathMatch: 'full' }
];
var CompareModule = /** @class */ (function () {
    function CompareModule() {
    }
    CompareModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(routes),
                SharedModule
            ],
            declarations: [
                CompareComponent
            ]
        })
    ], CompareModule);
    return CompareModule;
}());
export { CompareModule };
//# sourceMappingURL=compare.module.js.map