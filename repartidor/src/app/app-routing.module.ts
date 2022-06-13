import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LockScreenComponent } from './pages/lock-screen/lock-screen.component';
import { IsAuthenticatedGuard } from './users/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule) },
      { path: 'about', loadChildren: () => import('./pages/about/about.module').then((m) => m.AboutModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then((m) => m.ContactModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'chefs', loadChildren: () => import('./pages/chefs/chefs.module').then((m) => m.ChefsModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'reservation', loadChildren: () => import('./pages/reservation/reservation.module').then((m) => m.ReservationModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'categories', loadChildren: () => import('./pages/categories/categories.module').then((m) => m.CategoriesModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'restaurants', loadChildren: () => import('./pages/restaurants/restaurant.module').then((m) => m.RestaurantsModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'account', loadChildren: () => import('./pages/account/account.module').then((m) => m.AccountModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then((m) => m.CartModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then((m) => m.CheckoutModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'orders', loadChildren: () => import('./pages/account/orders/orders.module').then((m) => m.OrdersModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'login', loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule) },
      { path: 'register', loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'reset-password', loadChildren: () => import('./pages/reset-password/reset-password.module').then((m) => m.ResetPasswordModule) },
      { path: 'faq', loadChildren: () => import('./pages/faq/faq.module').then((m) => m.FaqModule), canActivate: [IsAuthenticatedGuard] },
      { path: 'terms-conditions', loadChildren: () => import('./pages/terms-conditions/terms-conditions.module').then((m) => m.TermsConditionsModule), canActivate: [IsAuthenticatedGuard] },
    ],
  },
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then((m) => m.LandingModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule), canActivate: [IsAuthenticatedGuard] },
  { path: 'lock-screen', component: LockScreenComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      initialNavigation: 'enabled', // for one load page, without reload
      relativeLinkResolution: 'legacy',
      // useHash: true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
