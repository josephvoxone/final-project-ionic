import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'app/tabs',
    component: TabsPage,
    children: [{
      path: 'tab-home', children:
        [{ path: '', loadChildren: '../tab-home/tab-home.module#TabHomePageModule' }]
    }, {
      path: 'tab-akun', children:
        [{ path: '', loadChildren: '../tab-akun/tab-akun.module#TabAkunPageModule' }]
    }, {
      path: 'tab-order', children:
        [{ path: '', loadChildren: '../tab-order/tab-order.module#TabOrderPageModule' }]
    }, {
      path: '', redirectTo: '/tabs/tab-home', pathMatch: 'full'
    }
    ]
  },
  {
    path: '',
    redirectTo: 'app/tabs/tab-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
