import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Customer } from '../models/customer.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loadCustomer() {

    const url = `${ baseUrl }/customers`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (res: {ok: boolean, customers: Customer[] }) => res.customers )
              );
  }

  getCustomerId( id: string ) {

    const url = `${ baseUrl }/customers/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (res: {ok: boolean, customer: Customer }) => res.customer )
              );
  }

  createCustomer( customer: { name: string, company: string } ) {

    const url = `${ baseUrl }/customers`;
    return this.http.post( url, customer, this.headers );
  }
  
  updateCustomer( customer: Customer  ) {

    const url = `${ baseUrl }/customers/${ customer._id }`;
    return this.http.put( url, customer, this.headers );
  }

  deleteCustomer( _id: string ) {

    const url = `${ baseUrl }/customers/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
