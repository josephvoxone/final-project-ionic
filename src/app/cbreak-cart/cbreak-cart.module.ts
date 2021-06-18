import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CbreakCartPage } from './cbreak-cart.page';

const routes: Routes = [
  {
    path: '',
    component: CbreakCartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CbreakCartPage]
})
export class CbreakCartPageModule {}
