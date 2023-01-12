import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(
        localStorage.getItem('token')
      );
  
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this.router.navigateByUrl('/login');
      }
  
      return this.authService.isLoggedIn()
        .pipe(
          tap(valid => {
            if (!valid) {
              this.router.navigateByUrl('/login');
            }
          })
        );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
      
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
        this.router.navigateByUrl('/login');
    }


    return this.authService.isLoggedIn()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/login');
          }
        })
      );

    
    
    
  }
}
