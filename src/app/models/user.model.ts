import { environment } from './../../environments/environment';

const baseURL = environment.baseUrl;

export class User{

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public id?: string
    ){}

    get imageUrl() {

        if ( !this.img ) {
            return `${ baseURL }/uploads/users/no-image`;
        } else if ( this.img.includes('https') ) {
            return this.img;
        } else if ( this.img ) {
            return `${ baseURL }/uploads/users/${ this.img }`;
        } else {
            return `${ baseURL }/uploads/users/no-image`;
        }
    }
}