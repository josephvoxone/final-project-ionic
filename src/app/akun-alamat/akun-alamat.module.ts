import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AkunAlamatPage } from './akun-alamat.page';

const routes: Routes = [
  {
    path: '',
    component: AkunAlamatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AkunAlamatPage]
})
export class AkunAlamatPageModule {}
