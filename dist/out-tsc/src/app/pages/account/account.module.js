var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AppGuardService } from './../../services/app-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
export var routes = [
    {
        path: '',
        component: AccountComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' }, canActivate: [AppGuardService], },
            { path: 'information', component: InformationComponent, data: { breadcrumb: 'Information' } },
            { path: 'addresses', component: AddressesComponent, data: { breadcrumb: 'Addresses' } },
            { path: 'orders', component: OrdersComponent, data: { breadcrumb: 'Orders' } }
        ]
    }
];
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule,
                SharedModule
            ],
            declarations: [
                AccountComponent,
                DashboardComponent,
                InformationComponent,
                AddressesComponent,
                OrdersComponent
            ]
        })
    ], AccountModule);
    return AccountModule;
}());
export { AccountModule };
//# sourceMappingURL=account.module.js.map