import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchesService } from 'src/app/services/searches.service';

import { Company } from 'src/app/models/company.model';
import { Customer } from 'src/app/models/customer.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public customers: Customer[] = [];
  public companies: Company[] = [];

  constructor( private activatedRote: ActivatedRoute,
                private searchService: SearchesService) { }

  ngOnInit(): void {

    this.activatedRote.params.subscribe( ({term}) => this.searchGlobal( term ) );

  }


  searchGlobal( term: string){
    this.searchService.searchGlobal( term )
      .subscribe( (res: any) => {
        console.log(res);
        
        this.users = res.users;
        this.customers = res.customers;
        this.companies = res.companies;

      })
  }

  openCustomer( customer: Customer){
    console.log(customer);
  }

}
