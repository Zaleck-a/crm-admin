import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public title: string;
  public tituloSubs$: Subscription;

  constructor( private router: Router) {

    this.tituloSubs$ = this.getDataRoot()
                           .subscribe( ({title}) => {
                            this.title = title;
                            document.title = `CRM - ${ title }`;
                          });
   }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

   getDataRoot(){
    return this.router.events.pipe(
              filter(event => event instanceof ActivationEnd ),
              filter((event: ActivationEnd) => event.snapshot.firstChild == null ? true : false),
              map( event => event.snapshot.data),
            );
   }
}
