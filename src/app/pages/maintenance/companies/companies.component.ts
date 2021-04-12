import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Company } from './../../../models/company.model';

import { CompanyService } from 'src/app/services/company.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styles: [
  ]
})
export class CompaniesComponent implements OnInit, OnDestroy {

  public companies: Company[] = [];
  public loading: boolean = true;
  private imageSubs: Subscription;

  constructor(private companyServices: CompanyService,
              private modalImageService: ModalImageService,
              private searchesService: SearchesService ) { }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }      

  ngOnInit(): void {
    this.loadCompanies();

    this.imageSubs = this.imageSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe( img => this.loadCompanies() );
  }

  search( term: string ) {

    if ( term.length === 0 ) {
      return this.loadCompanies();
    }

    this.searchesService.search( 'companies', term )
        .subscribe( res => {

          this.companies = res;

        });
  }

  loadCompanies() {

    this.loading = true;
    this.companyServices.loadCompany()
        .subscribe( companies => {
          this.loading = false;
          this.companies = companies;
        })

  }

  saveChanges( company: Company ) {

    this.companyServices.updateCompany( company._id, company.name )
        .subscribe( res => {
          Swal.fire( 'Actualizado', company.name, 'success' );
        });

  }

  deleteCompany( company: Company ) {

    this.companyServices.deleteCompany( company._id )
        .subscribe( res => {
          this.loadCompanies();
          Swal.fire( 'Borrado', company.name, 'success' );
        });

  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Empresa',
      text: 'Ingrese el nombre de la nueva empresa',
      input: 'text',
      inputPlaceholder: 'Nombre de la empresa',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      this.companyServices.createCompany( value )
        .subscribe( (res: any) => {
          this.companies.push( res.company )
        })
    }
  }

  openModal(company: Company) {

    this.modalImageService.openModal( 'companies', company._id, company.img );

  }

}
