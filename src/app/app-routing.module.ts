import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'forgotpw', loadChildren: './forgotpw/forgotpw.module#ForgotpwPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'swiper', loadChildren: './swiper/swiper.module#SwiperPageModule' },

  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: 'akun-alamat', loadChildren: './akun-alamat/akun-alamat.module#AkunAlamatPageModule' },
  { path: 'akun-alamatopsi', loadChildren: './akun-alamatopsi/akun-alamatopsi.module#AkunAlamatopsiPageModule' },
  { path: 'akun-password', loadChildren: './akun-password/akun-password.module#AkunPasswordPageModule' },
  { path: 'akun-profile', loadChildren: './akun-profile/akun-profile.module#AkunProfilePageModule' },
  { path: 'prasmanan', loadChildren: './prasmanan/prasmanan.module#PrasmananPageModule' },
  { path: 'prasmanan-detail', loadChildren: './prasmanan-detail/prasmanan-detail.module#PrasmananDetailPageModule' },
  { path: 'prasmanan-cart', loadChildren: './prasmanan-cart/prasmanan-cart.module#PrasmananCartPageModule' },
  { path: 'dekorasi', loadChildren: './dekorasi/dekorasi.module#DekorasiPageModule' },
  { path: 'order', loadChildren: './order/order.module#OrderPageModule' },
  { path: 'order-selesai', loadChildren: './order-selesai/order-selesai.module#OrderSelesaiPageModule' },
  { path: 'dekorasi-detail', loadChildren: './dekorasi-detail/dekorasi-detail.module#DekorasiDetailPageModule' },
  { path: 'mealbox', loadChildren: './mealbox/mealbox.module#MealboxPageModule' },
  { path: 'mealbox-detail', loadChildren: './mealbox-detail/mealbox-detail.module#MealboxDetailPageModule' },
  { path: 'mealbox-cart', loadChildren: './mealbox-cart/mealbox-cart.module#MealboxCartPageModule' },
  { path: 'cbreak', loadChildren: './cbreak/cbreak.module#CbreakPageModule' },
  { path: 'cbreak-cart', loadChildren: './cbreak-cart/cbreak-cart.module#CbreakCartPageModule' },
  { path: 'cbreak-detail', loadChildren: './cbreak-detail/cbreak-detail.module#CbreakDetailPageModule' },
  { path: 'order-opsi', loadChildren: './order-opsi/order-opsi.module#OrderOpsiPageModule' },
  { path: 'signin-valid', loadChildren: './signin-valid/signin-valid.module#SigninValidPageModule' },
  { path: 'order-rate', loadChildren: './order-rate/order-rate.module#OrderRatePageModule' },
  { path: 'order-favor', loadChildren: './order-favor/order-favor.module#OrderFavorPageModule' },
  { path: 'help', loadChildren: './help/help.module#HelpPageModule' },
  { path: 'forgotpw-reset', loadChildren: './forgotpw-reset/forgotpw-reset.module#ForgotpwResetPageModule' },
  { path: 'mealbox-search', loadChildren: './mealbox-search/mealbox-search.module#MealboxSearchPageModule' },
  { path: 'cbreak-search', loadChildren: './cbreak-search/cbreak-search.module#CbreakSearchPageModule' },
  { path: 'prasmanan-search', loadChildren: './prasmanan-search/prasmanan-search.module#PrasmananSearchPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
