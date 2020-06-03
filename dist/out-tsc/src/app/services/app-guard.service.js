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
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
var AppGuardService = /** @class */ (function () {
    function AppGuardService(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    AppGuardService.prototype.canActivate = function (route, state) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.auth.getCurrentUser().then(function (data) {
                if (_this.auth.loggedIn) {
                    _this.auth.getCart().then(function (data) {
                        if (data) {
                            console.log(data);
                            resolve(true);
                        }
                        else {
                            reject();
                        }
                    });
                }
                resolve(true);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    AppGuardService.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    AppGuardService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [Router, AuthService])
    ], AppGuardService);
    return AppGuardService;
}());
export { AppGuardService };
//# sourceMappingURL=app-guard.service.js.map