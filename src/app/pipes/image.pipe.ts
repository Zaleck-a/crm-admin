import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( img: string, type: 'users'|'customers'|'companies'): string {

    if ( !img ) {
        return `${ baseUrl }/uploads/users/no-image`;
    } else if ( img.includes('https') ) {
        return img;
    } else if ( img ) {
        return `${ baseUrl }/uploads/${ type }/${ img }`;
    } else {
        return `${ baseUrl }/uploads/users/no-image`;
    }
  }

}
