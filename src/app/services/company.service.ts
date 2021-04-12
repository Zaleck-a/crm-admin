import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Company } from '../models/company.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

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

  
  loadCompany() {

    const url = `${ baseUrl }/companies`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (res: {ok: boolean, companies: Company[] }) => res.companies )
              );
  }

  createCompany( name: string ) {

    const url = `${ baseUrl }/companies`;
    return this.http.post( url, { name }, this.headers );
  }
  
  updateCompany( _id: string, name: string  ) {

    const url = `${ baseUrl }/companies/${ _id }`;
    return this.http.put( url, { name }, this.headers );
  }

  deleteCompany( _id: string ) {

    const url = `${ baseUrl }/companies/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
