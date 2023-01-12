import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';


@Component({
  selector: 'app-tarjeta-actividad',
  templateUrl: './tarjeta-actividad.component.html',
  styleUrls: ['./tarjeta-actividad.component.css']
})



export class TarjetaActividadComponent implements OnInit {

  @Input() actividad: registroActividad = {
      nombre: '',
      prioridadAlta: false,
      autor: [{
        id: '',
        name: ''
      }],
      cliente: [{
        id: '',
        razon_social: ''
      }],
      proyecto: [{
        id: '',
        nombre: ''
      }],
      fecha: 0,
      dia: 0,
      tiempoAcumulado: {
        hora: '',
        minuto: '',
        segundo: ''
      },
      lista: [],
      tiempoInicio: 0,
      tiempoFinal: 0,
      idActividad: 0,
      colaboradorAsignado: [{
        id: '',
        name: ''
      }]
  } 

  


  constructor( private capturaService: CapturaActividadService ) { }

  abrirActividad( act: registroActividad ){
    console.log(act);    
    this.capturaService.detalleActividad(act);
    this.capturaService.toggle(); //toggleSidenav
  }

  ngOnInit(): void {


  }

}
