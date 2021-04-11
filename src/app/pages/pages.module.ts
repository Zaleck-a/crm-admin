import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Modulos
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { Grafic1Component } from './grafic1/grafic1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ComponentModule } from '../components/component.module';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';


@NgModule({
  declarations: [
    Grafic1Component,
    ProgressComponent,
    DashboardComponent,
    PagesComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
  ],
  exports: [
    Grafic1Component,
    ProgressComponent,
    DashboardComponent,
    PagesComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ComponentModule,
    ReactiveFormsModule
  ],
})
export class PagesModule { }
