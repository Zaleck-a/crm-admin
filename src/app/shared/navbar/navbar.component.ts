import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  public user: User;

  constructor( private userServise: UserService, 
               private router: Router) {
    this.user = userServise.user;
   }

  ngOnInit(): void {
  }

  logout(){
    this.userServise.logout();
  }

  search(term: string){

    if( term.length === 0){
      return;
    }

    this.router.navigateByUrl(`/dashboard/search/${term}`)
  }

}
