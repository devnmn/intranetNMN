import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CapturaActividadModule } from './capturaActividadModule/CapturaAct.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { RecargaDirective } from './directives/recarga.directive';




@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    RecargaDirective,
  ],
  imports: [
    BrowserModule,
    CapturaActividadModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
