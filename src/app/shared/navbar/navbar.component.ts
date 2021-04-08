import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor( private userServise: UserService ) { }

  ngOnInit(): void {
  }

  logout(){
    this.userServise.logout();
  }

}
