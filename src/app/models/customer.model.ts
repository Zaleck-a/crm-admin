import { Company } from './company.model';

interface _CustomerUser {
    _id: string;
    name: string;
    img: string;
}


export class Customer {

    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public user?: _CustomerUser,
        public company?: Company
    ) {}

}
