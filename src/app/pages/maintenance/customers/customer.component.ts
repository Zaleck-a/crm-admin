import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Company } from 'src/app/models/company.model';
import { Customer } from 'src/app/models/customer.model';

import { CompanyService } from 'src/app/services/company.service';
import { CustomerService } from 'src/app/services/customer.service';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styles: [
  ]
})
export class CustomerComponent implements OnInit {

  public customerForm: FormGroup;
  public companies: Company[] = [];

  public customerSelected: Customer;
  public companySelected: Company;



  constructor(private fb: FormBuilder,
    private companyService: CompanyService,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(({ id }) => this.loadCustomer(id));

    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
    });

    this.loadCompanies();

    this.customerForm.get('company').valueChanges
      .subscribe(companyId => {
        this.companySelected = this.companies.find(e => e._id === companyId);
      })
  }

  loadCustomer(id: string) {

    if (id === 'new') {
      return;
    }

    this.customerService.getCustomerId(id)
      .pipe(
        delay(100)
      )
      .subscribe(customer => {

        if (!customer) {
          return this.router.navigateByUrl(`/dashboard/customers`);
        }

        const { name, company: { _id } } = customer;
        this.customerSelected = customer;
        this.customerForm.setValue({ name, company: _id });
      });

  }

  loadCompanies() {

    this.companyService.loadCompany()
      .subscribe((companies: Company[]) => {
        this.companies = companies;
      })

  }

  saveCustomer() {

    const { name } = this.customerForm.value;

    if (this.customerSelected) {
      // actualizar
      const data = {
        ...this.customerForm.value,
        _id: this.customerSelected._id
      }
      this.customerService.updateCustomer(data)
        .subscribe(res => {
          Swal.fire('Actualizado', `${name} actualizado correctamente`, 'success');
        })

    } else {
      // crear

      this.customerService.createCustomer(this.customerForm.value)
        .subscribe((res: any) => {
          Swal.fire('Creado', `${name} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/customer/${res.customer._id}`)
        })
    }
  }

}
