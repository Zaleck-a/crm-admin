import { Customer } from './customer.model';
import { User } from './user.model';

interface _ProyectUser {
    _id: string;
    name: string;
    img: string;
}


export class Project {

    constructor(
        public name: string,
        public _id?: string,
        public manager?: User,
        public dates?: Array<Date>,
        public description?: string,
        public status?: string,
        public _delete?: boolean,
        public user?: _ProyectUser,
        public customer?: Customer
    ) {}

}
