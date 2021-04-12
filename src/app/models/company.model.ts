interface _CompanyUser{
    _id: string;
    name: string; 
    img: string; 
}

export class Company {
    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public user?: _CompanyUser,
    ){}
}