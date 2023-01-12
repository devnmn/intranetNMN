import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Usuario } from 'src/app/auth/interfaces/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CapturaActividadService } from '../../services/capturaActividad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  @ViewChild('drawer') public sidenav!: MatSidenav; //revisar - toggleSidenav
  
  user: Usuario = {
    uid: '',
    name: '',
    token: ''
  }

  fechaActual: any;

  semanaActual: any;



  onClosed(){

    console.log(this.capturaService.contador)

    this.capturaService.cambiaEstadoService('captura')

    if ( this.capturaService.contador ) { //Al cerrar, el cronometro está iniciado
      
      clearInterval(this.capturaService.contador)
      this.capturaService.contador = null;  
      this.capturaService.buttonLabel = 'Iniciar';

      console.log("Al cerrar, el cronometro está iniciado");  

    } else { //Al cerrar, el cronometro NO está iniciado

      console.log("Al cerrar, el cronometro NO está iniciado");  

    }

    console.log(this.capturaService.contador)
  }


  constructor( private capturaService:CapturaActividadService,
               private authService:AuthService,
               private datePipe:DatePipe ) { }

  ngOnInit() {
    this.capturaService.sideNavToggleSubject.subscribe(()=> { //toggleSidenav
      this.sidenav.toggle();
    });

    this.user = this.authService.usuario

    console.log(this.user);

    this.fechaActual = new Date();

    this.semanaActual = this.datePipe.transform( this.fechaActual,'w');

    

  
  
    
    
    
  }

}
