import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Customer } from 'src/app/models/customer.model';

import { SearchesService } from 'src/app/services/searches.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styles: [
  ]
})
export class CustomersComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public customers: Customer[] = [];
  private imageSubs: Subscription;

  constructor( private customerService: CustomerService,
              private modalImageService: ModalImageService,
              private searchesService: SearchesService ) { }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe()
  }
  
  ngOnInit(): void {
    this.loadCustomers();
    
    this.imageSubs = this.imageSubs = this.modalImageService.newImage
    .pipe(delay(100))
    .subscribe( img => this.loadCustomers() );
  }

  
  loadCustomers() {
    this.loading = true;
    this.customerService.loadCustomer()
      .subscribe( customers => {
        this.loading = false;
        this.customers = customers;
      });
  }

  search( term: string ) {

    if ( term.length === 0 ) {
      return this.loadCustomers();
    }

    this.searchesService.search( 'customers', term )
        .subscribe( res => {
          this.customers = res;
        });
  }

  openModal(customer: Customer) {

    this.modalImageService.openModal( 'customers', customer._id, customer.img );

  }

  deleteCustomer( customer: Customer ) {

    Swal.fire({
      title: '¿Borrar cliente?',
      text: `Esta a punto de borrar a ${ customer.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.customerService.deleteCustomer( customer._id )
          .subscribe( res => {
            
            this.loadCustomers();
            Swal.fire(
              'Cliente borrado',
              `${ customer.name } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

  }

}
