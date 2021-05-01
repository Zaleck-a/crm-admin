import { Component, Input } from '@angular/core';
import { SingleDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-polar',
  templateUrl: './polar.component.html',
  styles: [
  ]
})
export class PolarComponent{

  @Input('labels') polarAreaChartLabels: Label[] = ['Label1', 'Label2', 'Label3', 'Label4',];
  @Input('data') polarAreaChartData: SingleDataSet  = [ 350, 450, 100, 450];
  @Input('legend') polarAreaLegend  = true;


  public colors: Color[] = [
    { backgroundColor: 

        ['rgba(46, 145, 221, 0.4)', 
          'rgba(255, 0, 0, 0.4)', 
          'rgba(58, 178, 96, 0.4)', 
          'rgba(237, 231, 71, 0.4)',
        ]
    }
  ];

}
