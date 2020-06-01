var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SwiperDirective } from 'ngx-swiper-wrapper';
import { AppService } from '../../../app.service';
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
var ProductComponent = /** @class */ (function () {
    function ProductComponent(appService, activatedRoute, dialog, formBuilder) {
        this.appService = appService;
        this.activatedRoute = activatedRoute;
        this.dialog = dialog;
        this.formBuilder = formBuilder;
        this.config = {};
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.activatedRoute.params.subscribe(function (params) {
            _this.getProductById(params['id']);
        });
        this.form = this.formBuilder.group({
            'review': [null, Validators.required],
            'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
            'email': [null, Validators.compose([Validators.required, emailValidator])]
        });
        this.getRelatedProducts();
    };
    ProductComponent.prototype.ngAfterViewInit = function () {
        this.config = {
            observer: false,
            slidesPerView: 4,
            spaceBetween: 10,
            keyboard: true,
            navigation: true,
            pagination: false,
            loop: false,
            preloadImages: false,
            lazy: true,
            breakpoints: {
                480: {
                    slidesPerView: 2
                },
                600: {
                    slidesPerView: 3,
                }
            }
        };
    };
    ProductComponent.prototype.getProductById = function (id) {
        var _this = this;
        this.appService.getProductById(id).subscribe(function (data) {
            _this.product = data;
            _this.image = data.images[0].medium;
            _this.zoomImage = data.images[0].big;
            setTimeout(function () {
                _this.config.observer = true;
                // this.directiveRef.setIndex(0);
            });
        });
    };
    ProductComponent.prototype.getRelatedProducts = function () {
        var _this = this;
        this.appService.getProducts('related').subscribe(function (data) {
            _this.relatedProducts = data;
        });
    };
    ProductComponent.prototype.selectImage = function (image) {
        this.image = image.medium;
        this.zoomImage = image.big;
    };
    ProductComponent.prototype.onMouseMove = function (e) {
        if (window.innerWidth >= 1280) {
            var image, offsetX, offsetY, x, y, zoomer;
            image = e.currentTarget;
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            x = offsetX / image.offsetWidth * 100;
            y = offsetY / image.offsetHeight * 100;
            zoomer = this.zoomViewer.nativeElement.children[0];
            if (zoomer) {
                zoomer.style.backgroundPosition = x + '% ' + y + '%';
                zoomer.style.display = "block";
                zoomer.style.height = image.height + 'px';
                zoomer.style.width = image.width + 'px';
            }
        }
    };
    ProductComponent.prototype.onMouseLeave = function (event) {
        this.zoomViewer.nativeElement.children[0].style.display = "none";
    };
    ProductComponent.prototype.openZoomViewer = function () {
        this.dialog.open(ProductZoomComponent, {
            data: this.zoomImage,
            panelClass: 'zoom-dialog'
        });
    };
    ProductComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProductComponent.prototype.onSubmit = function (values) {
        if (this.form.valid) {
            //email sent
        }
    };
    __decorate([
        ViewChild('zoomViewer'),
        __metadata("design:type", Object)
    ], ProductComponent.prototype, "zoomViewer", void 0);
    __decorate([
        ViewChild(SwiperDirective),
        __metadata("design:type", SwiperDirective)
    ], ProductComponent.prototype, "directiveRef", void 0);
    ProductComponent = __decorate([
        Component({
            selector: 'app-product',
            templateUrl: './product.component.html',
            styleUrls: ['./product.component.scss']
        }),
        __metadata("design:paramtypes", [AppService, ActivatedRoute, MatDialog, FormBuilder])
    ], ProductComponent);
    return ProductComponent;
}());
export { ProductComponent };
//# sourceMappingURL=product.component.js.map