import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ListaTractorComponent } from './tractor/lista-tractor/lista-tractor.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaMarcaComponent } from './marca/lista-marca/lista-marca.component';
import { ListaModeloComponent } from './modelo/lista-modelo/lista-modelo.component';
import { FiltroPipe } from './filtro.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CrearMarcaComponent } from './marca/crear-marca/crear-marca.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CrearModeloComponent } from './modelo/crear-modelo/crear-modelo.component';
import { MatSelectModule } from '@angular/material/select';
import { EliminarModeloComponent } from './modelo/eliminar-modelo/eliminar-modelo.component';
import { MatCardModule } from '@angular/material/card';
import { EliminarMarcaComponent } from './marca/eliminar-marca/eliminar-marca.component';
import { CrearTractorComponent } from './tractor/crear-tractor/crear-tractor.component';
import { EliminarTractorComponent } from './tractor/eliminar-tractor/eliminar-tractor.component';
import { EditarMarcaComponent } from './marca/editar-marca/editar-marca.component';
import { EditarModeloComponent } from './modelo/editar-modelo/editar-modelo.component';
import { EditarTractorComponent } from './tractor/editar-tractor/editar-tractor.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaTractorComponent,
    HomePageComponent,
    NavbarComponent,
    ListaMarcaComponent,
    ListaModeloComponent,
    FiltroPipe,
    CrearMarcaComponent,
    CrearModeloComponent,
    EliminarModeloComponent,
    EliminarMarcaComponent,
    CrearTractorComponent,
    EliminarTractorComponent,
    EditarMarcaComponent,
    EditarModeloComponent,
    EditarTractorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
