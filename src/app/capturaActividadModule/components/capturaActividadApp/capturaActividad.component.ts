import { Component } from '@angular/core';
import { registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';



@Component({
  selector: 'app-capturarActividad',
  templateUrl: `capturaActividad.component.html`,
  styleUrls: ['../../capturaActividad.css']
})
export class CapturaActividadComponent {




  
  get actividad() {
    
    return this.capturaService.actividad;
  }

  get estado() {
    return this.capturaService.estado;
  }


  constructor ( private capturaService:CapturaActividadService ) {}

  cambiaEstado(nuevoEstado: string){
    
    this.capturaService.cambiaEstadoService(nuevoEstado);
    
  }




}
