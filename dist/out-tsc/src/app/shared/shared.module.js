var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule } from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    wheelPropagation: true,
    suppressScrollX: true
};
import { PipesModule } from '../theme/pipes/pipes.module';
import { RatingComponent } from './rating/rating.component';
import { ControlsComponent } from './controls/controls.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { BrandsCarouselComponent } from './brands-carousel/brands-carousel.component';
import { ProductsCarouselComponent } from './products-carousel/products-carousel.component';
import { ProductDialogComponent } from './products-carousel/product-dialog/product-dialog.component';
import { BannersComponent } from './banners/banners.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule,
                SwiperModule,
                FlexLayoutModule,
                MatAutocompleteModule,
                MatButtonModule,
                MatButtonToggleModule,
                MatCardModule,
                MatCheckboxModule,
                MatChipsModule,
                MatDatepickerModule,
                MatDialogModule,
                MatExpansionModule,
                MatGridListModule,
                MatIconModule,
                MatInputModule,
                MatListModule,
                MatMenuModule,
                MatNativeDateModule,
                MatPaginatorModule,
                MatProgressBarModule,
                MatProgressSpinnerModule,
                MatRadioModule,
                MatRippleModule,
                MatSelectModule,
                MatSidenavModule,
                MatSliderModule,
                MatSlideToggleModule,
                MatSnackBarModule,
                MatSortModule,
                MatTableModule,
                MatTabsModule,
                MatToolbarModule,
                MatTooltipModule,
                MatStepperModule,
                PerfectScrollbarModule,
                PipesModule,
                ReactiveFormsModule,
                FormsModule
            ],
            exports: [
                RouterModule,
                SwiperModule,
                FlexLayoutModule,
                MatAutocompleteModule,
                MatButtonModule,
                MatButtonToggleModule,
                MatCardModule,
                MatCheckboxModule,
                MatChipsModule,
                MatDatepickerModule,
                MatDialogModule,
                MatExpansionModule,
                MatGridListModule,
                MatIconModule,
                MatInputModule,
                MatListModule,
                MatMenuModule,
                MatNativeDateModule,
                MatPaginatorModule,
                MatProgressBarModule,
                MatProgressSpinnerModule,
                MatRadioModule,
                MatRippleModule,
                MatSelectModule,
                MatSidenavModule,
                MatSliderModule,
                MatSlideToggleModule,
                MatSnackBarModule,
                MatSortModule,
                MatTableModule,
                MatTabsModule,
                MatToolbarModule,
                MatTooltipModule,
                MatStepperModule,
                PerfectScrollbarModule,
                PipesModule,
                RatingComponent,
                ControlsComponent,
                MainCarouselComponent,
                BrandsCarouselComponent,
                ProductsCarouselComponent,
                ProductDialogComponent,
                BannersComponent,
                CategoryListComponent,
                ReactiveFormsModule,
                FormsModule
            ],
            declarations: [
                RatingComponent,
                ControlsComponent,
                MainCarouselComponent,
                BrandsCarouselComponent,
                ProductsCarouselComponent,
                ProductDialogComponent,
                BannersComponent,
                CategoryListComponent
            ],
            entryComponents: [
                ProductDialogComponent
            ],
            providers: [
                { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map