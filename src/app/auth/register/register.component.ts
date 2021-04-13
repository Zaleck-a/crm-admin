import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent{

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name:      ['', Validators.required ],
    email:     ['', [Validators.required, Validators.email] ],
    password:  ['', [ Validators.required ]],
    password2: ['', [ Validators.required]],
    terms:     [ false, [Validators.required, Validators.requiredTrue] ],
  }, {
    validators: this.passwordsSame('password', 'password2')
  });

  constructor( private fb: FormBuilder,
               private userService: UserService,
               private router: Router) { }


  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);


    if ( this.registerForm.invalid ){
      return;
    }
    // Post
    this.userService.createUser( this.registerForm.value )
    .subscribe( resp => {
       // Navigate Dashboard
       this.router.navigateByUrl('/');

    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });

  }

  fildNotValid( fild: string ): boolean{

    if ( this.registerForm.get(fild).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }

  }


  paswordsNotValid(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2) &&  this.formSubmitted ){
      return true;
    }else{
      return false;
    }

  }

  aceptTerms(){
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }


  passwordsSame(pass1: string, pass2: string){

    return ( formGroup: FormGroup ) => {
      const passControl1 = formGroup.get(pass1);
      const passControl2 = formGroup.get(pass2);

      if ( passControl1.value === passControl2.value ){
        passControl2.setErrors(null);
      }else{
        passControl2.setErrors({ notSame: true });
      }
    };
  }
}
