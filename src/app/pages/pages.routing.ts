import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafic1Component } from './grafic1/grafic1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [

  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: {title: 'Dashboard'}},
      { path: 'progress', component: ProgressComponent, data: {title: 'Progress'} },
      { path: 'grafic1', component: Grafic1Component, data: {title: 'Graficas'} },
      { path: 'promesas', component: PromesasComponent, data: {title: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'} },
    ]
  }

];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
