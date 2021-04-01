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
      ]
    }
  ];
}
