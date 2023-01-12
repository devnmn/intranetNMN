import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, tap } from "rxjs";
import { acumuladorTiempo, acumuladorTiempoNumber, acumuladorTiempoString, registroActividad } from "../Interfaces/capturaActividad.interface";



@Injectable({
  providedIn:'root'
})
export class CapturaActividadService {

  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null); //toggleSidenav
  public idActividad = '';
  private _actividad: registroActividad = {
    nombre: '',
    prioridadAlta: false,
    autor: [{
      name: '',
      id: ''
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
      id:'',
      name:''
    } ]
  }

  private _tiempoAcumulado: acumuladorTiempo = {
    resHor: '00',
    resMin: '00',
    resSeg: '00'
  }

  buttonLabel: string = 'Iniciar'

  contador:any = null; //Cronometro

  estado: string = 'captura';

  get actividad(): registroActividad {
    return this._actividad;
  }

  get tiempoInicio(): number {
    return this._actividad.tiempoInicio;
  }

  get tiempoFinal(): number {
    return this._actividad.tiempoFinal;
  }

  get tiempoAcumulado(): any {
    return this._tiempoAcumulado
  }

  constructor( private http: HttpClient ){}

  public toggle() { //toggleSidenav
    return this.sideNavToggleSubject.next(null);
  }

  cambiaEstadoService(nuevoEstado: string){
    this.estado = nuevoEstado;
  }

  // getActividades(){
  //   return this.http.get('http://localhost:3000/actividades') 
  // }
  postNuevaActvidad( actividad:any ){
    const url = `https://nmn.com.mx/api/actividades`;
    const body = actividad;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>( url, body ,{ headers })
  }

  putEditaActvidad( actividad:any ){
    const url = `https://nmn.com.mx/api/actividades/${this.idActividad}`;
    const body = actividad;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<any>( url, body ,{ headers })
  }

  getActividadesSemana(){
    const url = `https://nmn.com.mx/api/actividades/semana/63a4d7e40a0301ffe0c9090c/2023/2`;
    console.log("token:" +localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get( url, { headers } );
  }

  getClientes(){
    const url = `https://nmn.com.mx/api/clientes`;
    console.log("token:" +localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    // const headers = new HttpHeaders()
    //   .set('x-token', localStorage.getItem('token') || '' );
    return this.http.get( url, { headers } );
  }

  getColaboradores(){
    const url = `https://nmn.com.mx/api/users`;
    console.log("token:" +localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    // const headers = new HttpHeaders()
    //   .set('x-token', localStorage.getItem('token') || '' );
    return this.http.get( url, { headers } );
  }

  getProyectos(){
    const url = `https://nmn.com.mx/api/proyectos`;
    console.log("token:" +localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    // const headers = new HttpHeaders()
    //   .set('x-token', localStorage.getItem('token') || '' );
    return this.http.get( url, { headers } );
  }

  difTiempo(inicio:number , final:number){
    let horaInicio:any = new Date(inicio)
    let h1 = horaInicio.getHours();
    let m1 = horaInicio.getMinutes();
    let s1 = horaInicio.getSeconds();

    let horaFinal:any = new Date(final)
    let h2 = horaFinal.getHours();
    let m2 = horaFinal.getMinutes();
    let s2 = horaFinal.getSeconds();

    let tiempo: any = {
      resHor: h2 - h1,
      resMin: m2 - m1,
      resSeg: s2 - s1
    }


    if (Math.sign(tiempo.resSeg) == -1) {
      tiempo.resSeg = tiempo.resSeg + 60;
      tiempo.resMin = tiempo.resMin - 1;
    }

    if (Math.sign(tiempo.resMin) == -1) {
      tiempo.resMin = tiempo.resMin + 60;
      tiempo.resHor = tiempo.resHor - 1;
    }

    if (tiempo.resHor < 10) {
      tiempo.resHor = '0' + tiempo.resHor
    }

    if (tiempo.resMin < 10) {
      tiempo.resMin = '0' + tiempo.resMin
    }

    if (tiempo.resSeg < 10) {
      tiempo.resSeg = '0' + tiempo.resSeg
    }

    return  tiempo
  }

  iniciadorActividad(){
    if (this._actividad.tiempoInicio == 0) { //Sin registros  --- CASO 1 ---

      
      this._tiempoAcumulado = {
        resSeg: '00',
        resHor: '00',
        resMin: '00'
      };

      

      console.log("caso 1");
      console.log(this._actividad.tiempoInicio);
    
  }else{ //con tiempo inicio

    if (this._actividad.tiempoFinal == 0) { //sin tiempo final  --- CASO 3 ---
      
      //this.datePipe.transform( new Date(this._actividad.tiempoInicio),'HH:mm:ss a','UTC -6')

      let timeNow: number = Date.now();
      let difTiempo: any = this.difTiempo(this.actividad.tiempoInicio, timeNow)
      this._tiempoAcumulado = difTiempo;
      // this._actividad.tiempoInicio = new Date(this._actividad.tiempoInicio).toLocaleTimeString('en-MX');
      this.iniciarCrono(difTiempo);
      console.log("caso 3");
      

    } else{ //Con tiempo final  --- CASO 2 ---


      //this.datePipe.transform( new Date(this._actividad.tiempoInicio),'HH:mm:ss a','UTC -6')
      this._tiempoAcumulado = this.difTiempo(this.actividad.tiempoInicio , this.actividad.tiempoFinal);
      console.log(this.actividad.tiempoFinal);
      console.log("caso 2");

    }
      
  }
  }

  detalleActividad( act: registroActividad ){
    
    console.log("detalle")
    
    this._actividad = act;
    console.log("detalle actividad", this._actividad)
    this.iniciadorActividad();
    
  }

  generarActividad( actividadVacia: registroActividad ){
    this._actividad = actividadVacia;
  }

  iniciarCrono( tiempoAcumulado?: acumuladorTiempo ){
    
    let hora:any = 0;
    let minuto:any = 0;
    let segundo:any = 0;  


  

    if ( tiempoAcumulado ) { //hay tiempo acumulado
      
      hora = parseInt(tiempoAcumulado.resHor);
      this.tiempoAcumulado.resHor > 10 ? 
      this.tiempoAcumulado.resHor = hora: 
      this.tiempoAcumulado.resHor = "0"+hora;

      minuto = parseInt(tiempoAcumulado.resMin);
      
      this.tiempoAcumulado.resMin > 10 ? 
      this.tiempoAcumulado.resMin = minuto : 
      this.tiempoAcumulado.resMin = "0"+minuto;
      
      segundo = parseInt(tiempoAcumulado.resSeg);
      
      this.tiempoAcumulado.resSeg > 10 ? 
      this.tiempoAcumulado.resSeg = segundo: 
      this.tiempoAcumulado.resSeg = "0"+segundo;
      
    }




    if (this.contador == undefined) { //No está iniciado
    
      this.actividad.tiempoInicio == 0 ? 
        this.actividad.tiempoInicio = Date.now() : //NO hay tiempo inicio
        this.actividad.tiempoInicio; //hay tiempo inicio

        
        
                
      this.actividad.tiempoFinal =!  0 ? 
        this.actividad.tiempoFinal = 0 : //NO hay tiempo final
        this.actividad.tiempoFinal; //hay tiempo final
      
      
      this.buttonLabel = 'Detener';
  
      this.contador = setInterval( ()=>{ // Reloj
        
        
        segundo +=1;
        if (segundo < 10) {this.tiempoAcumulado.resSeg = "0"+segundo;}
        else{this.tiempoAcumulado.resSeg = segundo;}


          if (segundo == 60) {


            segundo = 0;
            this.tiempoAcumulado.resSeg = "0"+segundo;
            minuto += 1;

            if (minuto < 10) {this.tiempoAcumulado.resMin = "0"+minuto;}
            else{this.tiempoAcumulado.resMin = minuto;}
          

            if (minuto == 60) {
                minuto = 0;
                this.tiempoAcumulado.resMin = "0"+minuto;
                hora += 1;
                if (hora < 10) {this.tiempoAcumulado.resHor = "0"+hora;}
                else{this.tiempoAcumulado.resHor = hora;}
                
              }
          }
      } , 1000 );
  
  
      }else{//Está iniciado
      clearInterval(this.contador); //detiene reloj
      
      this.actividad.tiempoFinal = Date.now();
      
      this.contador = null;
      this.buttonLabel = 'Iniciar';
      }
  }


}
