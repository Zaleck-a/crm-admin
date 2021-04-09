
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public imageUpdate: File;
  public imgTemp: any = null;

  constructor(private userServise: UserService,
              private fb: FormBuilder,
              private fileUploadService: FileUploadService) {
    this.user = userServise.user;
   }

  ngOnInit(): void {


    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [ this.user.email, [Validators.required, Validators.email]],
    });

  }

  updateProfile(){
    console.log(this.profileForm.value);
    this.userServise.updateProfile(this.profileForm.value)
      .subscribe(() => {

        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tus cambios han sido guardados',
          showConfirmButton: false,
          timer: 1500
        });
      }, err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }


  changeImage( file: File ){
    this.imageUpdate = file;

    if ( !file ){ return this.imgTemp = null; }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };

  }

  upImage(){
    this.fileUploadService.updatePicture(this.imageUpdate, 'users', this.user.id)
    .then( img => {
      this.user.img = img;
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tus cambios han sido guardados',
        showConfirmButton: false,
        timer: 1500
      });
    }).catch( err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  }
}
