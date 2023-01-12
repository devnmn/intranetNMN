import { Component, Input } from '@angular/core';
import { registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';

@Component({
  selector: 'app-estado-duplicar',
  templateUrl: './estado-duplicar.component.html',
  styleUrls: ['../../capturaActividad.css']
})
export class EstadoDuplicarComponent {
  
  @Input() actividad: registroActividad = {
    nombre: '',
    prioridadAlta: false,
    autor: [{
      id:'',
      name:''
    }],
    cliente: [{
      id:'',
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
  constructor( private capturaService:CapturaActividadService ) { }



}
