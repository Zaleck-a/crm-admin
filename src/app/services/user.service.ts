import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from './../interfaces/register-form-interface';
import { LoginForm } from '../interfaces/login-form-interface';
import { updateUser } from '../interfaces/update-users-interface';

import { User } from '../models/user.model';

const baseURL = environment.baseUrl;

declare  const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone) {

  this.googleInit();
}

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get id(): string{
    return this.user.id || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  googleInit(){

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '164686318383-usdfvkrp74vbm1e0d1ttkt5s1pt9gpgc.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(this.auth2);
      });
    });
  }

  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validToken(): Observable<boolean>{

    return this.http.get(`${ baseURL}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (res: any) => {

        const { email, google, name, role, img, id } = res.user;
        this.user = new User( name, email, '', img, google, role, id);

        localStorage.setItem('token', res.token);
        return true;
      }),
      catchError( error => of(false))
    );
  }

  createUser( formData: RegisterForm ){

    return this.http.post(`${ baseURL}/users`, formData)
                    .pipe(
                      tap( (resp: any) => {
                          localStorage.setItem('token', resp.token);
                        }
                      )
                    );
  }


  updateProfile( data: { email: string, name: string, role: string } ){

    data={
      ...data,
      role: this.user.role
    }

    return this.http.put(`${ baseURL}/users/${this.id}`, data, this.headers );
  }


  login( formData: LoginForm){
    return this.http.post(`${ baseURL}/login`, formData)
                    .pipe(
                      tap( (resp: any) => {
                          localStorage.setItem('token', resp.token);
                        }
                      )
                    );
  }

  loginGoogle( token ){
    return this.http.post(`${ baseURL}/login/google`, {token})
                    .pipe(
                      tap( (resp: any) => {
                          localStorage.setItem('token', resp.token);
                        }
                      )
                    );
  }

  uploadUsers(from: number = 0){


    const url = `${baseURL}/users?from=${from}`;

    return this.http.get<updateUser>(url, this.headers)
          .pipe(
            map( res => {
              const users = res.users.map(
                user => new User(user.name, user.email, '', user.img, user.google, user.role, user.id)
              );

              return{
                total: res.total,
                users
              };
            })
          );

  }

  deleteUser( user: User ) {

      // /users/idUser
      const url = `${ baseURL }/users/${ user.id }`;
      return this.http.delete( url, this.headers );
  }

  saveUser( user: User ) {

    return this.http.put(`${ baseURL }/users/${ user.id }`, user, this.headers );

  }
}