import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {

    /* this.retornaObserbable().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('Sub:', valor),
      error => console.warn('Error', error),
      () => console.log('Obs terminado'),
    ); */


    this.intervalSubs = this.retornaInterval().subscribe( console.log );
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }


  retornaInterval(): Observable<number>{
    return interval(100)
            .pipe(
              map( valor => valor + 1),
              filter(valor => valor % 2 === 0 ? true : false),
              // take(10),
            );

  }


  retornaObserbable(): Observable<number>{

    let i = -1;

    return new Observable<number> ( ( observer ) => {

      const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if ( i === 4 ){
          clearInterval( intervalo );
          observer.complete();
        }

        if ( i === 2 ){
          observer.error('i Llego al valor de 2');
        }

      }, 1000 );

    });

  }
}
