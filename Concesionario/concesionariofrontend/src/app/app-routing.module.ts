import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ListaTractorComponent } from './tractor/lista-tractor/lista-tractor.component';
import { ListaModeloComponent } from './modelo/lista-modelo/lista-modelo.component';
import { ListaMarcaComponent } from './marca/lista-marca/lista-marca.component';

// Definición de las rutas para la navegación en la aplicación
const routes: Routes = [
  { path: '', component: HomePageComponent },  // Ruta por defecto, redirige a la página de inicio
  { path: 'tractor', component: ListaTractorComponent },  // Ruta para la lista de tractores
  { path: 'modelo', component: ListaModeloComponent },   // Ruta para la lista de modelos
  { path: 'marca', component: ListaMarcaComponent },     // Ruta para la lista de marcas
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Redirige a la página de inicio si la ruta no coincide con ninguna definida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
