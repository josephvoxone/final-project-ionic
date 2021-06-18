import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgotpwResetPage } from './forgotpw-reset.page';

const routes: Routes = [
  {
    path: '',
    component: ForgotpwResetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotpwResetPage]
})
export class ForgotpwResetPageModule {}
