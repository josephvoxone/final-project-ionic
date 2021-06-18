import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrasmananDetailPage } from './prasmanan-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PrasmananDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrasmananDetailPage]
})
export class PrasmananDetailPageModule {}
