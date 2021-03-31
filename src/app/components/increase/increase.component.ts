import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-increase',
  templateUrl: './increase.component.html',
  styles: [
  ]
})
export class IncreaseComponent implements OnInit{

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('value') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';


  @Output('value') outValue: EventEmitter<number> = new EventEmitter();

  get getPercent() {

    return `${this.progress}%`;
  }

  setPrcent( value: number){

    if ( this.progress >= 100 && value >= 0 ){
      this.outValue.emit(100);
      return this.progress = 100;
    }

    if ( this.progress <= 0 && value < 0 ){
      this.outValue.emit(0);
      return this.progress = 0;
    }


    this.progress = this.progress + value;
    this.outValue.emit(this.progress);
  }

  onChange( newValue: number){

    if ( newValue >= 100 ){
      this.progress = 100;
    }else if ( newValue <= 0 ){
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.outValue.emit(this.progress);

  }
}
