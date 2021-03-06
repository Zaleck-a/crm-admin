import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {


  constructor( private userService: UserService,
               private router: Router){}
               
  canLoad(route: Route, segments: UrlSegment[]){
    return this.userService.validToken()
                .pipe(
                  tap( isAutenticated => {

                    if ( !isAutenticated ){
                      this.router.navigateByUrl('/login');

                    }
                  })
                );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.userService.validToken()
                .pipe(
                  tap( isAutenticated => {

                    if ( !isAutenticated ){
                      this.router.navigateByUrl('/login');

                    }
                  })
                );
  }
}
