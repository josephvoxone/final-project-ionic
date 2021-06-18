import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DekorasiDetailPage } from './dekorasi-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DekorasiDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DekorasiDetailPage]
})
export class DekorasiDetailPageModule {}
