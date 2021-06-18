import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CbreakDetailPage } from './cbreak-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CbreakDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CbreakDetailPage]
})
export class CbreakDetailPageModule {}
