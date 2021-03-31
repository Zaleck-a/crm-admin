import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { IncreaseComponent } from './increase/increase.component';
import { FormsModule } from '@angular/forms';
import { DountComponent } from './dount/dount.component';



@NgModule({
  declarations: [IncreaseComponent, DountComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
  ],
  exports: [
    IncreaseComponent,
    DountComponent
  ]
})
export class ComponentModule { }
