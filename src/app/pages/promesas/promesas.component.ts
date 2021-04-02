import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then((usuarios) => {
      console.log(usuarios);
    });



    /* const promesa = new Promise ( (res, rej) => {
      false ? res('se resolvio!') : rej('Algo salio mal!!'); 

    });

    promesa.then(mensaje => console.log(mensaje))

    .catch(err => console.log(err));

    console.log('hola mundo'); */
  }

  getUsers(){

    return new Promise(( resolve ) => {

      fetch('https://reqres.in/api/users?page=2')
      .then(res => res.json())
      .then( body => resolve(body.data));

    });
  }
}
