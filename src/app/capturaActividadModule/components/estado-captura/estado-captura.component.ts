import { Component, Input } from '@angular/core';
import { acumuladorTiempoNumber, acumuladorTiempoString, elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';


@Component({
  selector: 'app-estado-captura',
  templateUrl: './estado-captura.component.html',
  styleUrls: ['../../capturaActividad.css'],
  
})
export class EstadoCapturaComponent{

  @Input() actividad: registroActividad = {
    nombre: '',
    prioridadAlta: false,
    autor: [{
      name: '',
      id: ''
    }],
    cliente: [{
      razon_social: '',
      id: ''
    }],
    proyecto: [{
      nombre: '',
      id:''
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
      id:'',
      name:''
    }],
    descripcion: ''
  }

  

  
  get buttonLabel():any {
    return this.capturaService.buttonLabel;
 }
  get tiempoAcumulado():any {
    return this.capturaService.tiempoAcumulado;
 }

  get tiempoInicio():any {
     return this.capturaService.tiempoInicio;
  }

  get tiempoFinal():any {
    return this.capturaService.tiempoFinal;
  }


 


  acumuladorPrincipal: acumuladorTiempoNumber ={ //Cronometro
    hora: 0,
    minuto: 0,
    segundo: 0
  };

  acumuladorInicial: acumuladorTiempoString ={ //Cronometro
    hora: '00',
    minuto: '00',
    segundo: ''
  };


  acumuladorFinal: acumuladorTiempoString ={ //Cronometro
    hora: '00',
    minuto: '00',
    segundo: ''
  };

  nuevo: elementoLista = {
    contenido: '',
    estatus: false
  }


  
  constructor( private capturaService:CapturaActividadService ) { }

  
  

  // getHoras(timestamp: number):number{return new Date(timestamp).getHours();}

  // getMinutos(timestamp: number):number{return new Date(timestamp).getMinutes();}

  startCrono(){ //Cronometro
    this.capturaService.iniciarCrono();

  }

  agregarCheckList(){
    

    if ( this.nuevo.contenido.trim().length === 0 ) { return; }
    
    this.actividad.lista.push( {...this.nuevo} );
    this.nuevo.contenido = '';


  }




}
