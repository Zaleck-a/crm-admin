import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal = true;

  public type: 'users' | 'companies'| 'customers';
  public id: string;
  public img: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();


  get hideModal(){
    return this._hideModal;
  }

  openModal(type: 'users' | 'companies'| 'customers', id: string, img: string  = 'no-image'){
    this._hideModal = false;
    this.type = type;
    this.id = id;

    if ( img.includes('https') ){
      this.img = img;
    }else {
      this.img = `${baseUrl}/uploads/${type}/${img}`;
    }

    // this.img = img;
  }

  closeModal(){
    this._hideModal = true;
  }

  constructor(){}
}
