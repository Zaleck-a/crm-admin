import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any [] = [
    {
      title: 'Dashboard',
      icon: 'nav-icon fas fa-tachometer-alt',
      submenu: [
        { title: 'Panel', url: '/'},
        { title: 'ProbressBar', url: 'progress'},
        { title: 'Gráficas', url: 'grafic1'},
        { title: 'Promesas', url: 'promesas'},
        { title: 'Rxjs', url: 'rxjs'},
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'nav-icon fas fa-toolbox',
      submenu: [
        { title: 'Usuarios', url: 'users'},
        { title: 'Clientes', url: 'customers'},
        { title: 'Empresas', url: 'companies'},
      ]
    }
  ];
}
