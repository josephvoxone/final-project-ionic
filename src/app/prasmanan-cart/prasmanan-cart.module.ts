import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrasmananCartPage } from './prasmanan-cart.page';

const routes: Routes = [
  {
    path: '',
    component: PrasmananCartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrasmananCartPage]
})
export class PrasmananCartPageModule {}
