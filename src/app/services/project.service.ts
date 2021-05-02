import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Project } from '../models/project.model';
import { Customer } from '../models/customer.model';
import { User } from '../models/user.model';


const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor( private http: HttpClient ) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  
  loadProject() {

    const url = `${ baseUrl }/projects`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (res: {ok: boolean, projects: Project[] }) => { 

                  for(let i = 0; i < res.projects.length; i++){
                    res.projects[i].dates[0] = new Date(res.projects[i].dates[0]);
                    res.projects[i].dates[1] = new Date(res.projects[i].dates[1]);
                  }
                  return res.projects 
                
                })
              ); 
  }

  createProject( name: string ) {

    const url = `${ baseUrl }/projects`;
    return this.http.post( url, { name }, this.headers );
  }

  updateProject( _id: string, name: string, customer: Customer, manager: User, status: string, dates:Array<Date>, description: string  ) {

    const url = `${ baseUrl }/projects/${ _id }`;
    return this.http.put( url, { name, customer, manager, status, dates, description }, this.headers )
                    .pipe(
                      map( (res:any) => {
                          
                          const fecha1 = new Date(res.project.dates[0])
                          const fecha2 = new Date(res.project.dates[1])
                          const fecha3 = [fecha1,fecha2]
                          res.project.dates = fecha3
                          
                          return res;
                      } )
                    );
  }

  updatePrice( _id: string, name: string, price: string){
    const url = `${ baseUrl }/projects/${ _id }`;

    return this.http.put( url, { name, price }, this.headers );
  }

  deleteProject( _id: string ) {

    const url = `${ baseUrl }/projects/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
