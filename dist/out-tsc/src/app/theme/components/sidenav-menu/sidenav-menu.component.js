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
import { SidenavMenuService } from './sidenav-menu.service';
var SidenavMenuComponent = /** @class */ (function () {
    function SidenavMenuComponent(sidenavMenuService) {
        this.sidenavMenuService = sidenavMenuService;
    }
    SidenavMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parentMenu = this.menuItems.filter(function (item) { return item.parentId == _this.menuParentId; });
    };
    SidenavMenuComponent.prototype.onClick = function (menuId) {
        this.sidenavMenuService.toggleMenuItem(menuId);
        this.sidenavMenuService.closeOtherSubMenus(this.menuItems, menuId);
    };
    __decorate([
        Input('menuItems'),
        __metadata("design:type", Object)
    ], SidenavMenuComponent.prototype, "menuItems", void 0);
    __decorate([
        Input('menuParentId'),
        __metadata("design:type", Object)
    ], SidenavMenuComponent.prototype, "menuParentId", void 0);
    SidenavMenuComponent = __decorate([
        Component({
            selector: 'app-sidenav-menu',
            templateUrl: './sidenav-menu.component.html',
            styleUrls: ['./sidenav-menu.component.scss'],
            providers: [SidenavMenuService]
        }),
        __metadata("design:paramtypes", [SidenavMenuService])
    ], SidenavMenuComponent);
    return SidenavMenuComponent;
}());
export { SidenavMenuComponent };
//# sourceMappingURL=sidenav-menu.component.js.map