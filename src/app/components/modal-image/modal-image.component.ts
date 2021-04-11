import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  // public hideModal: boolean = false;

  public imageUpdate: File;
  public imgTemp: any = null;

  constructor( public modalImageService: ModalImageService,
               public fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.imgTemp = null;
    this.modalImageService.closeModal();
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


    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService.updatePicture(this.imageUpdate, type, id)
    .then( img => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tus cambios han sido guardados',
        showConfirmButton: false,
        timer: 1500
      });
      this.modalImageService.newImage.emit(img);
      this.closeModal()
    }).catch( err => {
      console.log(err);
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  }

}
