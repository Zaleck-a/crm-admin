import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Customer } from '../models/customer.model';
import { Company } from './../models/company.model';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(private http: HttpClient) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private usersTransform( results: any[] ): User[] {

    return results.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.role, user.id )
    );
  }


  private companiesTransform( results: any[] ): Company[] {

    return results;
  }

  private customersTransform( results: any[] ): Customer[] {

    return results;
  }



  searchGlobal(term: string){
    const url = `${ baseUrl }/search/${ term }`;
    return this.http.get( url, this.headers );
  }


  search(type: 'users'|'customers'|'companies', term: string ) {

    // http://localhost:3000/api/search/collection/users/e

  const url = `${ baseUrl }/search/collection/${ type }/${ term }`;
  return this.http.get<any[]>( url, this.headers )
          .pipe(
            map( (res: any ) =>  {

              switch ( type ) {
                case 'users':
                  return this.usersTransform( res.results )

                case 'companies':
                  return this.companiesTransform( res.results )

                case 'customers':
                  return this.customersTransform( res.results )  

                default:
                  return [];
              }

            })
          );
  }
}

