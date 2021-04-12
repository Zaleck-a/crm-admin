import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafic1Component } from './grafic1/grafic1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

// Maintenance
import { UsersComponent } from './maintenance/users/users.component';
import { CustomersComponent } from './maintenance/customers/customers.component';
import { CompaniesComponent } from './maintenance/companies/companies.component';
import { CustomerComponent } from './maintenance/customers/customer.component';

const routes: Routes = [

  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: {title: 'Dashboard'}},
      { path: 'progress', component: ProgressComponent, data: {title: 'Progress'} },
      { path: 'grafic1', component: Grafic1Component, data: {title: 'Graficas'} },
      { path: 'promesas', component: PromesasComponent, data: {title: 'Promesas'} },
      { path: 'profile', component: ProfileComponent, data: {title: 'Profile'} },
      { path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs'} },

      // Maintenance
      { path: 'users', component: UsersComponent, data: {title: 'Mantenimiento de usuarios'} },
      { path: 'customers', component: CustomersComponent, data: {title: 'Mantenimiento de clientes'} },
      { path: 'customer/:id', component: CustomerComponent, data: {title: 'Detalle de cliente'} },
      { path: 'companies', component: CompaniesComponent, data: {title: 'Mantenimiento de empresas'} },
    ]
  }

];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
