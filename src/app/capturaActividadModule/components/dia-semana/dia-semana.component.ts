import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';

@Component({
  selector: 'app-dia-semana',
  templateUrl: './dia-semana.component.html',
  styleUrls: ['./dia-semana.component.css']
})
export class DiaSemanaComponent implements OnInit {

  @Input() diasEnSemana: number[] = [];

  @Input() diaActual: number = 0;

  actividad: registroActividad = {
    
    nombre: '',
    prioridadAlta: false,
    autor: [{
      id: '',
      name: ''
    }],
    cliente: [{
      id: '',
      razon_social:''
    }],
    proyecto: [{
      id:'',
      nombre:''
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
    }]
    
  }

  humanDate: any = "";

  

  lunes: registroActividad[] = [];

  martes: registroActividad[] = [];

  miercoles: registroActividad[] = [];

  jueves: registroActividad[] = [];

  viernes: registroActividad[] = [];

  sabado: registroActividad[] = [];

  domingo: registroActividad[] = [];

  constructor( private capturaService: CapturaActividadService ) { }

  crearActividad( dia:number ){
    console.log("crea", this.diasEnSemana[dia])

    const actividadVacia: registroActividad = {
      
      nombre: '',
      prioridadAlta: false,
      autor: [{
        id: '',
        name: ''
      }],
      cliente: [{
        id: '',
        razon_social:''
      }],
      proyecto: [{
        id:'',
        nombre:''
      }],
      fecha: this.diasEnSemana[dia],
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
      }]
      
    }

    this.capturaService.toggle();//toggleSidenav
    this.capturaService.cambiaEstadoService('crear');
    this.capturaService.generarActividad( actividadVacia );
  }

  formatActs( arrayActividades: any ){
    let arrayprueba = [0,1,2,3]
    //console.log(arrayActividades.data.length)
    
    arrayActividades.data.forEach((element: any) => {
      
      this.actividad = element
      
      this.humanDate = new Date((element.fecha)) //transforma el Timestamp a un objeto fecha
      let prueba = this.humanDate.toLocaleString(window.navigator.language, {weekday: "short"})
      
      this.actividad.dia = this.humanDate.toLocaleString(window.navigator.language, {weekday: "short"}) //saca el dia de la fecha en formato de tres letras (lunes => "lun")
      console.log(this.actividad)
      this.sortAct( this.actividad ) //manda la actividad a la funcion 'sortAct()' y ésta la asigna en su dia correspondiente
    });

  }

  sortAct(actividad: any){
      
      switch (actividad.dia) {
        case "dom": //domingo
          this.domingo.push( {...actividad} );
          break;
  
        case "lun": //lunes
          this.lunes.push( {...actividad} );
          break;
  
        case "mar": //martes
          this.martes.push( {...actividad} );
          break;
  
        case "mié": //miercoles
          this.miercoles.push( {...actividad} );
          break;
        case "jue": //jueves
          this.jueves.push( {...actividad} );
          break;
  
        case "vie": //viernes
          this.viernes.push( {...actividad} );
          break;
  
        case "sáb": //sabado
          this.sabado.push( {...actividad} );
          break;
        
        default:
          break;
       }
  }

  ngOnInit(): void {

    this.capturaService.getActividadesSemana()
      .subscribe( actividades =>{
            console.log(actividades)
            this.formatActs(actividades)
          } 
        );

  }

}
