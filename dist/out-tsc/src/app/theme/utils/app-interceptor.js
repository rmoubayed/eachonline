var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
var AppInterceptor = /** @class */ (function () {
    function AppInterceptor(spinner) {
        this.spinner = spinner;
    }
    AppInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        this.spinner.show();
        return next.handle(req).pipe(map(function (event) {
            if (event instanceof HttpResponse) {
                _this.spinner.hide();
            }
            return event;
        }), catchError(function (error) {
            var started = Date.now();
            var elapsed = Date.now() - started;
            console.log("Request for " + req.urlWithParams + " failed after " + elapsed + " ms.");
            // debugger;
            return throwError(error);
        }));
    };
    AppInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [NgxSpinnerService])
    ], AppInterceptor);
    return AppInterceptor;
}());
export { AppInterceptor };
//# sourceMappingURL=app-interceptor.js.map