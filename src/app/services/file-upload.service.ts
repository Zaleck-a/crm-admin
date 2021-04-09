import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }


  async updatePicture(
    file: File,
    type: 'users' | 'customers' | 'companies',
    id: string
  ){
    
    try {

      const url = `${ baseUrl }/uploads/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch( url, {
        method: 'put',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });


      const data = await res.json();
      if ( data.ok ){
        return data.fileName;
      }else{
        console.log(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
