import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estado-edicion',
  templateUrl: './estado-edicion.component.html',
  styleUrls: ['../../capturaActividad.css']
})
export class EstadoEdicionComponent implements OnInit {

  @Input() actividad: any = {
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
    colaboradorAsignado: [{
      id: '',
      name: ''
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
    idActividad: 0
  }

  
  editaActividadFormulario: FormGroup = this.fb.group({

    nombre: ['', [Validators.required]],
    descripcion: [''],
    prioridadAlta: [false, [Validators.required]],
    //autor: this.autor, //se recupera el nombre del usuario ✅
    colaboradorAsignado: ['', [Validators.required]],
    cliente: ['', [Validators.required]],
    proyecto: ['', [Validators.required]],
    //semana: [''],//semana
    //mes: [''],//mes
    //anio: [''],//anio
    tiempoInicio: [''],
    tiempoFinal: [''],
    fecha: ['', [Validators.required]],

  });

  editaActividad_envio: any = {

    nombre: '', //desde formulario ✅ 
    descripcion: '',  //desde formulario ✅ puede ir vacio
    prioridadAlta: false, //desde formulario ✅
    autor: '', //se recupera el nombre del usuario ✅
    colaborador: '', //se recupera el nombre del colaborador ❌ || se puede cambiar en formulario SI ES ADMINISTRADOR ✅
    cliente: '',  //desde formulario ✅
    proyecto: '', //desde formulario ✅
    semana: 0,//semana ✅
    mes: 0,//mes ✅
    anio: 0,//anio ✅
    tiempoInicio: 0, //si esta vacio se manda en 0 ✅ || si NO esta vacio se recupera del formulario ✅ se procesa y se convierte en timeStamp ❌
    tiempoFinal: 0,  //si esta vacio se manda en 0 ✅ || si NO esta vacio se recupera del formulario ✅ se procesa y se convierte en timeStamp ❌
    fecha: 0,  //se inicia con la fecha del dia seleccionado ✅ || se puede cambiar en formulario ✅
    lista: [] //se recupera la checkList del componente ✅

  };

  editaActividad() {

    const fechaSimple = this.pipe.transform(this.editaActividadFormulario.value.fecha, 'yyyy/MM/dd')
    const fechaTimeStamp: Date = this.editaActividadFormulario.value.fecha.getTime()
    const anio = this.editaActividadFormulario.value.fecha.getFullYear()
    const mes = this.editaActividadFormulario.value.fecha.getMonth() + 1
    const semana = parseInt(this.pipe.transform(this.editaActividadFormulario.value.fecha, 'w')!);

    if (this.editaActividadFormulario.value.tiempoInicio === '') { //si esta vacio se manda en 0 ✅
      this.editaActividad_envio.tiempoInicio = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoInicioTimeStamp = this.horaMinutoToDate(this.editaActividadFormulario.value.tiempoInicio + ':00', fechaSimple)
      this.editaActividad_envio.tiempoInicio = tiempoInicioTimeStamp;
    }

    if (this.editaActividadFormulario.value.tiempoFinal === '') { //si esta vacio se manda en 0 ✅
      this.editaActividad_envio.tiempoFinal = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoFinalTimeStamp = this.horaMinutoToDate(this.editaActividadFormulario.value.tiempoFinal + ':00', fechaSimple)
      this.editaActividad_envio.tiempoFinal = tiempoFinalTimeStamp;
    }

    this.editaActividad_envio.nombre = this.editaActividadFormulario.value.nombre;
    this.editaActividad_envio.descripcion = this.editaActividadFormulario.value.descripcion;
    this.editaActividad_envio.prioridadAlta = this.editaActividadFormulario.value.prioridadAlta;
    this.editaActividad_envio.autor = this.authService.usuario.uid;
    this.editaActividad_envio.colaborador = this.editaActividadFormulario.value.colaboradorAsignado;
    this.editaActividad_envio.cliente = this.editaActividadFormulario.value.cliente;
    this.editaActividad_envio.proyecto = this.editaActividadFormulario.value.proyecto;
    this.editaActividad_envio.semana = semana;
    this.editaActividad_envio.mes = mes;
    this.editaActividad_envio.anio = anio;
    // this.editaActividad_envio.tiempoInicio  = Se procesa en el condicional y se transforma en TimeStamp ✅
    // this.editaActividad_envio.tiempoFinal   = Se procesa en el condicional y se transforma en TimeStamp ✅
    this.editaActividad_envio.fecha = fechaTimeStamp
    this.editaActividad_envio.lista = this.actividad.lista

    console.log('Nueva actividad a enviar:', this.editaActividad_envio);

    this.capturaService.putEditaActvidad(this.editaActividad_envio)
      .subscribe(resp => {
        const message = 'La actividad se creo correctamente';
        const snackBarRef = this.snackBar.open(message, 'Ok', { verticalPosition: 'bottom', horizontalPosition: 'right' });
        snackBarRef.afterDismissed().subscribe(info => {
          if (info.dismissedByAction === true) {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.navigateByUrl('/actividades');
          }
        });
      });
  }

  get buttonLabel(): any {
    return this.capturaService.buttonLabel;
  }
  get tiempoAcumulado(): any {
    return this.capturaService.tiempoAcumulado;
  }

  get tiempoInicio(): any {
    return this.capturaService.tiempoInicio;
  }

  get tiempoFinal(): any {
    return this.capturaService.tiempoFinal;
  }
  public _clientes: any[] = [];
  public _proyectos: any[] = [];
  public _colaboradores: any[] = [];

  selectedDate: any = '';
  //this.datePipe.transform(new Date(this.actividad.fecha), 'yyyy-MM-dd');

  colaboradores: any[] = this._colaboradores; // pruebas 

  clientes: any[] = this._clientes; // pruebas 

  proyectos: any[] = this._proyectos; // pruebas 

  nuevo: elementoLista = {
    contenido: '',
    estatus: false
  }

  horaInicial: number = 0;
  minutoInicial: number = 0;
  horaFinal: number = 0;
  minutoFinal: number = 0;

    constructor(private capturaService: CapturaActividadService,
      private authService: AuthService,
      private snackBar: MatSnackBar,
      private fb: FormBuilder,
      private router: Router,
      private pipe: DatePipe) { }



  ngOnInit(): void {
    
    
    this.capturaService.idActividad = this.actividad._id
    console.log(this.capturaService.idActividad);
    this.capturaService.getColaboradores()
      .subscribe(colaboradores => {
        this.formatColaboradores(colaboradores)
      }
      );
    this.capturaService.getClientes()
      .subscribe(clientes => {
        this.formatClientes(clientes)
      }
      );
    this.capturaService.getProyectos()
      .subscribe(proyectos => {
        this.formatProyectos(proyectos)
      }
      );
    console.log(this.actividad.cliente[0]._id)
    console.log(this.actividad.fecha);
    this.selectedDate = this.pipe.transform(new Date(this.actividad.fecha), 'yyyy-MM-dd');
  }

  formatClientes(arrayClientes: any) {
    arrayClientes.data.forEach((element: any) => {
      this._clientes.push({
        id: element._id,
        razon_social: element.razon_social.toUpperCase()
      }
      )
    });
  }

  formatColaboradores(arrayColaboradores: any) {
    arrayColaboradores.data.forEach((element: any) => {
      this._colaboradores.push({
        id: element._id,
        nombre: element.name.toUpperCase()
      }
      )
    });
  }

  formatProyectos(arrayProyectos: any) {
    arrayProyectos.data.forEach((element: any) => {
      this._proyectos.push({
        id: element._id,
        nombre: element.nombre.toUpperCase()
      }
      )
    });
  }

  agregarCheckList() {

    if (this.nuevo.contenido.trim().length === 0) { return; }

    this.actividad.lista.push({ ...this.nuevo });
    this.nuevo.contenido = '';

  }

  horaMinutoToDate(horaMinuto: string, fecha: any) {
    let tiempoArr: any[] = horaMinuto.split(":")
    let fechaArr: any[] = fecha.split("/")

    //                       |   año    |        mes      |    dia      |   hora     |  minuto    |  segundo  | 
    let resultado = new Date(fechaArr[0], fechaArr[1] - 1, fechaArr[2], tiempoArr[0], tiempoArr[1], tiempoArr[2]).getTime()

    return resultado

  }

}
