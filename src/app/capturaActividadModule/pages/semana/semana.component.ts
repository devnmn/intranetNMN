import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-semana',
  templateUrl: './semana.component.html',
  styleUrls: ['./semana.component.css']
})
export class SemanaComponent implements OnInit {

  

  fechaActual: any;

  fechaAlterada: boolean = false;

  fechaSeleccionada: any;

  diasEnSemana: number[] = []

  diaActual: number = 0;

  selected: any;

  

  diasSemana(diaActual: any) {
    let semana= new Array();
    let dia = new Date(diaActual);
  
    dia.setDate((dia.getDate() - dia.getDay()));
    for (let i = 0; i < 7; i++) {
      semana.push(
            new Date(dia).setHours(0,0,0)
        ); 
        dia.setDate(dia.getDate() +1);
    }
    return semana; 
  }

  sumarDias(fecha:any, dias:any){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  restarDias(fecha:any, dias:any){
    fecha.setDate(fecha.getDate() - dias);
    return fecha;
  }

  avanzarSemana(){
    this.fechaSeleccionada = new Date(this.sumarDias(this.fechaSeleccionada, 7))
    this.diasEnSemana = this.diasSemana( this.fechaSeleccionada )
    this.fechaAlterada = true;
    this.diaActual = 66;
  }

  retrocederSemana(){
    this.fechaSeleccionada = new Date(this.restarDias(this.fechaSeleccionada, 7))
    this.fechaAlterada = true;
    this.diasEnSemana = this.diasSemana( this.fechaSeleccionada )
    this.diaActual = 66;
  }

  regresarSemanaActual(){
    
    this.fechaActual = new Date();
    this.fechaSeleccionada = this.fechaActual;
    this.diasEnSemana = this.diasSemana( this.fechaSeleccionada );
    this.diaActual = new Date().getDay();
    this.fechaAlterada = false;

  }

  constructor() { }

  ngOnInit(): void {

    this.fechaActual = new Date();

    this.diaActual = new Date().getDay();

    this.fechaSeleccionada = this.fechaActual;

    this.diasEnSemana = this.diasSemana( this.fechaSeleccionada )

  }
}
