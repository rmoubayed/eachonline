import { ProductListingResolver } from './services/product-listing.resolver';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AppGuardService } from './services/app-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SignInGuardService } from './services/sign-in-guard.service';
import { CheckoutGuardService } from './services/checkout-guard.service';
import { ProductComponent } from './pages/products/product/product.component';

export const routes: Routes = [
    { 
        path: '', 
        canActivateChild:[AppGuardService],
        component: PagesComponent, children: [
            { path: '', loadChildren: './pages/home/home.module#HomeModule' },
            { path: 'account', loadChildren: './pages/account/account.module#AccountModule', data: { breadcrumb: 'Account Settings' } },
            { path: 'compare', loadChildren: './pages/compare/compare.module#CompareModule', data: { breadcrumb: 'Compare' }, canActivate:[AuthGuardService] },
            { path: 'wishlist', loadChildren: './pages/wishlist/wishlist.module#WishlistModule', data: { breadcrumb: 'Wishlist' }, canActivate:[AuthGuardService] },
            { path: 'cart', loadChildren: './pages/cart/cart.module#CartModule', data: { breadcrumb: 'Cart' }, canActivate:[AuthGuardService] },
            { path: 'checkout', loadChildren: './pages/checkout/checkout.module#CheckoutModule', data: { breadcrumb: 'Checkout' }, canActivate:[AuthGuardService, CheckoutGuardService] },
            { path: 'contact', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Contact' } },
            { path: 'privacy-policy', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Privacy Policy' } },
            { path: 'about-us', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'About Us' } },
            { path: 'manufactures', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Manufactures' } },
            { path: 'wholesalers', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Wholesalers' } },
            { path: 'retailers-and-stores', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Retailers & Stores' } },
            { path: 'services-providers', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Services Providers' } },
            { path: 'concierge-managers', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Concierge Managers' } },
            { path: 'regional-managers', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Regional Managers' } },
            { path: 'terms-of-use', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Terms of Use' } },
            { path: 'return-policy', loadChildren: './pages/contact/contact.module#ContactModule', data: { breadcrumb: 'Return Policy' } },
            { path: 'sign-in', loadChildren: './pages/sign-in/sign-in.module#SignInModule', data: { breadcrumb: 'Sign In ' }, canActivate:[SignInGuardService] },
            // { path: 'brands', loadChildren: './pages/brands/brands.module#BrandsModule', data: { breadcrumb: 'Brands' } },
            { path: 'products', resolve: {facets:ProductListingResolver},loadChildren: './pages/products/products.module#ProductsModule', data: { breadcrumb: 'All Products' } },
            { path: 'search', loadChildren: './pages/products/products.module#ProductsModule', data: { breadcrumb: 'All Products' } },

        ]
    },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});