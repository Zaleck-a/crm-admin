import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

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

  private usersTransform( resultados: any[] ): User[] {

    return resultados.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.role, user.id )
    );
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

                default:
                  return [];
              }

            })
          );
  }
}

