import { Component, Input, OnInit } from '@angular/core';
import { elementoLista, registroActividad } from '../../Interfaces/capturaActividad.interface';
import { CapturaActividadService } from '../../services/capturaActividad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-estado-crear',
  templateUrl: './estado-crear.component.html',
  styleUrls: ['../../capturaActividad.css'],
})
export class EstadoCrearComponent implements OnInit {

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
  private _baseUrl: string = environment.apiBaseUrl;
  public _clientes: any[] = [];
  public _proyectos: any[] = [];
  public _colaboradores: any[] = [];

  colaboradores: any[] = this._colaboradores; // pruebas 

  clientes: any[] = this._clientes; // pruebas 

  proyectos: any[] = this._proyectos; // pruebas 

  // colaboradores: string[]= ['Colaborador 1','Colaborador 2','Colaborador 3','Colaborador 4','Colaborador 5','Colaborador 6']; // pruebas 

  // clientes: string[]= ['Novidesa','Alveg','Medpoint','Fluix']; // pruebas 

  // proyectos: string[]= ['Campañas','Revisión de contenido','Mantenimiento sitio Web','Redes','Junta semanal']; // pruebas 

  nuevaLista: elementoLista[] = [];

  autor: string = '';

  colaborador: string = '';

  fechaPrueba = '04/01/2023';

  nuevo: elementoLista = {
    contenido: '',
    estatus: false
  }

  nuevaActividadFormulario: FormGroup = this.fb.group({

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

  nuevaActividad_envio: any = {

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


  constructor(private capturaService: CapturaActividadService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private pipe: DatePipe) { }

  ngOnInit(): void {
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

    this.nuevaActividadFormulario.value.nombre = this.actividad.fecha
    console.log("oninit estadocrear", this.nuevaActividadFormulario.value.nombre);

    let fecha = new Date(this.actividad.fecha)
    this.nuevaActividadFormulario.patchValue({
      fecha: fecha
    })
  }

  horaMinutoToDate(horaMinuto: string, fecha: any) {
    let tiempoArr: any[] = horaMinuto.split(":")
    let fechaArr: any[] = fecha.split("/")

    //                       |   año    |        mes      |    dia      |   hora     |  minuto    |  segundo  | 
    let resultado = new Date(fechaArr[0], fechaArr[1] - 1, fechaArr[2], tiempoArr[0], tiempoArr[1], tiempoArr[2]).getTime()

    return resultado

  }



  crearNuevaActividad() {

    const fechaSimple = this.pipe.transform(this.nuevaActividadFormulario.value.fecha, 'yyyy/MM/dd')
    const fechaTimeStamp: Date = this.nuevaActividadFormulario.value.fecha.getTime()
    const anio = this.nuevaActividadFormulario.value.fecha.getFullYear()
    const mes = this.nuevaActividadFormulario.value.fecha.getMonth() + 1
    const semana = parseInt(this.pipe.transform(this.nuevaActividadFormulario.value.fecha, 'w')!);

    if (this.nuevaActividadFormulario.value.tiempoInicio === '') { //si esta vacio se manda en 0 ✅
      this.nuevaActividad_envio.tiempoInicio = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoInicioTimeStamp = this.horaMinutoToDate(this.nuevaActividadFormulario.value.tiempoInicio + ':00', fechaSimple)
      this.nuevaActividad_envio.tiempoInicio = tiempoInicioTimeStamp;
    }

    if (this.nuevaActividadFormulario.value.tiempoFinal === '') { //si esta vacio se manda en 0 ✅
      this.nuevaActividad_envio.tiempoFinal = 0;
    } else { //si tiene datos se convierte en timeStamp ✅
      const tiempoFinalTimeStamp = this.horaMinutoToDate(this.nuevaActividadFormulario.value.tiempoFinal + ':00', fechaSimple)
      this.nuevaActividad_envio.tiempoFinal = tiempoFinalTimeStamp;
    }

    this.nuevaActividad_envio.nombre = this.nuevaActividadFormulario.value.nombre;
    this.nuevaActividad_envio.descripcion = this.nuevaActividadFormulario.value.descripcion;
    this.nuevaActividad_envio.prioridadAlta = this.nuevaActividadFormulario.value.prioridadAlta;
    this.nuevaActividad_envio.autor = this.authService.usuario.uid;
    this.nuevaActividad_envio.colaborador = this.nuevaActividadFormulario.value.colaboradorAsignado;
    this.nuevaActividad_envio.cliente = this.nuevaActividadFormulario.value.cliente;
    this.nuevaActividad_envio.proyecto = this.nuevaActividadFormulario.value.proyecto;
    this.nuevaActividad_envio.semana = semana;
    this.nuevaActividad_envio.mes = mes;
    this.nuevaActividad_envio.anio = anio;
    // this.nuevaActividad_envio.tiempoInicio  = Se procesa en el condicional y se transforma en TimeStamp ✅
    // this.nuevaActividad_envio.tiempoFinal   = Se procesa en el condicional y se transforma en TimeStamp ✅
    this.nuevaActividad_envio.fecha = fechaTimeStamp
    this.nuevaActividad_envio.lista = this.actividad.lista

    console.log('Nueva actividad a enviar:', this.nuevaActividad_envio);

    this.capturaService.postNuevaActvidad(this.nuevaActividad_envio)
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

  agregarCheckList() {

    if (this.nuevo.contenido.trim().length === 0) { return; }

    this.actividad.lista.push({ ...this.nuevo });
    this.nuevo.contenido = '';

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
    console.log(this._proyectos)
  }
}
