import { Component } from '@angular/core';


@Component({
  selector: 'app-grafic1',
  templateUrl: './grafic1.component.html',
  styles: [
  ]
})
export class Grafic1Component{

  public labels1: string[] = ['Tacos', 'Pan', 'Tostadas'];
  public data1 = [[ 60, 10, 130 ]];
}
