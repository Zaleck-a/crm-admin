import { Component, OnInit } from '@angular/core';

import { SearchesService } from 'src/app/services/searches.service';
import { ProjectService } from 'src/app/services/project.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';

import { Project } from 'src/app/models/project.model';
import { Customer } from 'src/app/models/customer.model';
import { User } from 'src/app/models/user.model';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styles: [
  ]
})
export class ProjectsComponent implements OnInit {

  public projects: Project[] = [];
  public customers: Customer[] = [];
  public managers: User[] = [];
  public loading: boolean = true;

  constructor(private projectServices: ProjectService,
              private searchesService: SearchesService,
              private customerService: CustomerService,
              private userService: UserService ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadCustomers();
    this.loadManagers()
  }

  search( term: string ) {

    if ( term.length === 0 ) {
      return this.loadProjects();
    }

    this.searchesService.search( 'projects', term )
        .subscribe( res => {

          this.projects = res;

        });
  }

  loadProjects() {

    this.loading = true;
    this.projectServices.loadProject()
        .subscribe( projects => {
          
          this.loading = false;
          this.projects = projects;
        })
    
  }

  loadCustomers(){
    this.customerService.loadCustomer()
        .subscribe( customers => {
          this.customers = customers;
        });
  }

  loadManagers(){
    this.userService.loadUser()
        .subscribe( managers => {
          this.managers = managers; 
        });
  }


   saveChanges( project: Project ) {
    
    this.projectServices.updateProject( project._id, project.name, project.customer ,project.manager,
                                        project.status, project.dates, project.description )
        .subscribe( res => {
          
          Swal.fire( 'Actualizado', project.name, 'success' );
          
        });
  }
  

  deleteCompany( project: Project ) {

    this.projectServices.deleteProject( project._id )
        .subscribe( res => {
          this.loadProjects();
          Swal.fire( 'Borrado', project.name, 'success' );
        });

  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Proyecto',
      text: 'Ingrese el nombre del nuevo proyecto',
      input: 'text',
      inputPlaceholder: 'Nombre del proyecto',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      this.projectServices.createProject( value )
        .subscribe( (res: any) => {
          this.projects.push( res.project )
        })
    }
  } 

}
