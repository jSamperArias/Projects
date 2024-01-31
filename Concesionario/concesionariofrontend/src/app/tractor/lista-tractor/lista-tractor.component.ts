/**
 * Este componente Angular representa la lista de TRACTORES.
 *
 * Se encarga de gestionar la visualización de los TRACTORES, así como de interactuar con el servicio correspondiente.
 */

import { Component } from '@angular/core';
import { TractorService } from '../../service/tractor.service';
import { Tractor } from '../../models/tractor';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CrearTractorComponent } from '../crear-tractor/crear-tractor.component';
import { EliminarTractorComponent } from '../eliminar-tractor/eliminar-tractor.component';
import { EditarTractorComponent } from '../editar-tractor/editar-tractor.component';

@Component({
  selector: 'app-lista-tractor',
  templateUrl: './lista-tractor.component.html',
  styleUrl: './lista-tractor.component.css',
})
export class ListaTractorComponent {

  // Atributos.
  filtroBusqueda: any; // Variable utilizada para filtrar la lista de TRACTORES.
  tractores: Tractor[] = [];
  subscription: Subscription = new Subscription();
  loading: boolean;

  // Constructor.
  constructor(private tractorService: TractorService, private _dialog: MatDialog) {
    this.loading = true;
  }

  // Método llamado después de que Angular ha inicializado todas las directivas del componente.
  ngOnInit() {
    
    /**
     * Se suscribe al servicio de TRACTOR lista() para obtener la lista de TRACTORES y cargar la lista de TRACTORES
     * en el atributo TRACTORES, además, este evento tiene una pantalla de carga personalizada que dura 8ms.
     */ 
    this.tractorService.lista().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.tractores = data.sort((a, b) => (a.id_tractor && b.id_tractor) ? a.id_tractor - b.id_tractor : 0);
          this.loading = false;
        }, 600);
      },
      error: (err) => {
        console.log(err);
      },
    });

    // Esta subscripción permite recargar la tabla cuando hay eventos que hacen que esta misma sea modificada.
    this.subscription = this.tractorService.actualizar$.subscribe(() => {
      this.tractorService.lista().subscribe({
        next: (data) => {
          this.tractores = data.sort((a, b) => (a.id_tractor && b.id_tractor) ? a.id_tractor - b.id_tractor : 0);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  // Método para abrir el diálogo de creación de un TRACTOR.
  abrirModalCrear() {
    this._dialog.open(CrearTractorComponent);
  }

  // Método para abrir el diálogo de edición de un TRACTOR.
  abrirModalEditar(tractor: Tractor) {
    this._dialog.open(EditarTractorComponent, {
      data: { tractor: tractor },
    });
  }

  // Método para abrir el diálogo de eliminación de un TRACTOR, pasando la información del TRACTOR.
  abrirModalEliminar(tractor: Tractor) {
    this._dialog.open(EliminarTractorComponent, {
      data: { tractor: tractor },
    });
  }
}
