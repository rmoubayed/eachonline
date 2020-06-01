var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductZoomComponent } from './product/product-zoom/product-zoom.component';
export var routes = [
    { path: '', component: ProductsComponent, pathMatch: 'full' },
    { path: ':name', component: ProductsComponent },
    { path: ':id/:name', component: ProductComponent }
];
var ProductsModule = /** @class */ (function () {
    function ProductsModule() {
    }
    ProductsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(routes),
                FormsModule,
                ReactiveFormsModule,
                SwiperModule,
                NgxPaginationModule,
                SharedModule,
                PipesModule
            ],
            declarations: [
                ProductsComponent,
                ProductComponent,
                ProductZoomComponent
            ],
            entryComponents: [
                ProductZoomComponent
            ]
        })
    ], ProductsModule);
    return ProductsModule;
}());
export { ProductsModule };
//# sourceMappingURL=products.module.js.map