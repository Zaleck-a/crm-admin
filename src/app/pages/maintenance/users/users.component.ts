import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { UserService } from 'src/app/services/user.service';
import { SearchesService } from './../../../services/searches.service';
import { ModalImageService } from './../../../services/modal-image.service';

import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {


  public totalUsers = 0;
  public users:User[] = [];
  public usersTemp:User[] = [];

  public imageSubs: Subscription;
  public from = 0;
  public loading: boolean = true;

  constructor( private userService: UserService,
               private searchService: SearchesService,
               private modalImageService: ModalImageService ) { }

  ngOnDestroy(): void{
    this.imageSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.uploadUsers();
    this.imageSubs= this.modalImageService.newImage
      .pipe( delay(100) ).subscribe( img => this.uploadUsers() );

  }

  uploadUsers(){
    this.loading = true;
    this.userService.uploadUsers(this.from)
    .subscribe( ({ total, users}) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });

  }


  changePage( value: number){
    this.from += value;

    if ( this.from < 0){
      this.from = 0;
    }else if ( this.from >= this.totalUsers ){
      this.from -= value;
    }

    this.uploadUsers();

  }


  search(term: string){

    if ( term.length === 0){
      return this.users = this.usersTemp;
    }

    this.searchService.search('users', term)
      .subscribe( (res: User[]) => {
        this.users = res;
      });
  }



  deleteUser( user: User ) {

    if ( user.id === this.userService.id ) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ user.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.userService.deleteUser( user )
          .subscribe( () => {

            this.uploadUsers();
            Swal.fire(
              'Usuario borrado',
              `${ user.name } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

  changeRole( user: User ) {
    this.userService.saveUser(user)
      .subscribe( res => {
        console.log(res);
      });
  }


  openModal( user: User ) {
    this.modalImageService.openModal('users', user.id, user.img);
  }

}
