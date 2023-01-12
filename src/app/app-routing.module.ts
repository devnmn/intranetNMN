import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './capturaActividadModule/pages/home/home.component';

import { ErrorPageComponent } from './shared/error-page/error-page.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'actividades',
    loadChildren: () => import('./capturaActividadModule/CapturaAct.module').then( m => m.CapturaActividadModule ),
    component: HomeComponent, 
    canLoad: [ AuthGuard ]
  },
  {
    path: '404',
    component: ErrorPageComponent 
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation:'reload'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
