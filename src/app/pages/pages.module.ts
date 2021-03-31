import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Modulos
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { Grafic1Component } from './grafic1/grafic1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ComponentModule } from '../components/component.module';


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
    FormsModule,
    RouterModule,
    SharedModule,
    ComponentModule
  ],
})
export class PagesModule { }
