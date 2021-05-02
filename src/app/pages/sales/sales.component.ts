import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { SearchesService } from 'src/app/services/searches.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styles: [
  ]
})
export class SalesComponent implements OnInit {

  public sales: Project[] = [];
  public loading: boolean = false;

  constructor( private projectService: ProjectService,
               private searchesService: SearchesService) { }
  

  ngOnInit(): void {
    this.loadSales();
    
  }

  loadSales(){
    this.projectService.loadProject()
        .subscribe( sales => {
          this.sales = sales;
        })
  }

  search(term:string){
    if ( term.length === 0 ) {
      return this.loadSales();
    }

    this.searchesService.search( 'projects', term )
        .subscribe( res => {

          this.sales = res;

        });
  }

  saveChanges( project: Project ) {
    this.projectService.updatePrice( project._id,project.name, project.price )
         .subscribe( res => {
          Swal.fire( 'Precio actualizado', project.name, 'success' );
          
        });
  }

  changeInput(idElement: string){

    const element = document.querySelector(`[id='${idElement}']`) 
    
    if(element.getAttribute('disabled') === ''){
      element.removeAttribute('disabled');
    }else{
      element.setAttribute('disabled', '');
    }
    
  }
}
