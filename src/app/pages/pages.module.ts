import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { Grafic1Component } from './grafic1/grafic1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';




@NgModule({
  declarations: [
    Grafic1Component,
    ProgressComponent,
    DashboardComponent,
    PagesComponent,
  ],
  exports: [
    Grafic1Component,
    ProgressComponent,
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
})
export class PagesModule { }
