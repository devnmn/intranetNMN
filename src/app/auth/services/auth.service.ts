import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { catchError, map } from "rxjs/operators";
import { Observable, of , tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private baseUrl: string = environment.apiBaseUrl;
  private _usuario: Usuario = {
    name: '',
    uid: '',
    token: '',
  };

  get usuario() {
    return { ...this._usuario  }
  }

  constructor( private http: HttpClient ) { }

  login( email: string, password: string ){
    
    const url = `${ this.baseUrl }/auth/login`;
    //const url = `localhost:4000/api/auth`;
    const body = { email, password };

    let respuesta = this.http.post<any>( url, body )
    
    .pipe(
      tap( resp =>  {
        if ( resp.data.ok ) {
          
        console.log( resp.data )
          localStorage.setItem('token', resp.data.token!)
          this._usuario = {
            name: resp.data.user.name!,
            uid: resp.data.user._id!,
            token: resp.data.token!
          }
        }
      }),
     map( resp => resp['data'] ),
     catchError( err => {
      
      return of(err);
      
    }));
    return respuesta
  }

  get token(): boolean {
    let authToken = localStorage.getItem('token');
    return authToken !== null ? true : false;
  }

  isLoggedIn(): Observable<boolean> {
    let authToken = localStorage.getItem('token');
    const url = `${this.baseUrl}/auth/renew`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    })
    return this.http.get<any>(url, { headers })
      .pipe(
        tap(resp => {
          if (resp.data.ok) {
            console.log(resp)
            localStorage.setItem('token', resp.data.token!)
            this._usuario = {
              name: resp.data.user.name!,
              uid: resp.data.user._id!,
              token: resp.data.token!
            }
          } 
        }),
        map(resp => resp.data.ok),
        catchError(err => {
          return of(err);
        })
      )
  }


  validarToken() {
    const url = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '' );

    return this.http.get( url, { headers } );
  }
}
