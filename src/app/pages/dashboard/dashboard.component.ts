import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent{

  public labels1: string[] = ['Interacciones', 'Venta', 'Visitas', 'Citas' ];
  public data1 = [160, 310, 480, 250];
  public legend1 = false;

}
