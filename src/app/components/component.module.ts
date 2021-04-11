import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { IncreaseComponent } from './increase/increase.component';
import { FormsModule } from '@angular/forms';
import { DountComponent } from './dount/dount.component';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [IncreaseComponent, DountComponent, ModalImageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
  ],
  exports: [
    IncreaseComponent,
    DountComponent,
    ModalImageComponent
  ]
})
export class ComponentModule { }
