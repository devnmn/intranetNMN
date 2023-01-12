import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  miFormulario: FormGroup = this.fb.group({
    email:     ['miguel@nmn.mx',[ Validators.required, Validators.email ]],
    password:  ['nmn466mx',[ Validators.required, Validators.minLength(6) ]],
    
  });

  errorLabel: string = '';

  constructor( private fb:FormBuilder,
               private router: Router,
               private authService: AuthService ) { }

  login(){

    
    console.log(this.miFormulario.value);
    const { email, password } = this.miFormulario.value;
    this.authService.login( email, password )
      .subscribe( ok => {

        
        

        if ( ok.ok === true ) {
          this.router.navigateByUrl('/actividades');
        }else{
          this.errorLabel = ok.error.error 
        }
      });
    
  }
  
  

}
