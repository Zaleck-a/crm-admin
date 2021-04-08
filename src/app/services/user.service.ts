import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from './../interfaces/register-form-interface';
import { LoginForm } from '../interfaces/login-form-interface';

const baseURL = environment.baseUrl;

declare  const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone) {

  this.googleInit();              
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
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ baseURL}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map( res => true ),
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

}
