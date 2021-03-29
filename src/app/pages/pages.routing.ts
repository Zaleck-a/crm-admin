import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafic1Component } from './grafic1/grafic1.component';

const routes: Routes = [

  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafic1', component: Grafic1Component },
    ]
  }

];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
