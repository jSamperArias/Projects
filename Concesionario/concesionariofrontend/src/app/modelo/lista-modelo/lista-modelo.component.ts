/**
 * Este componente Angular representa la lista de MODELOS.
 *
 * Se encarga de gestionar la visualización de los MODELOS, así como de interactuar con el servicio correspondiente.
 */

import { Component } from '@angular/core';
import { Modelo } from '../../models/modelo';
import { ModeloService } from '../../service/modelo.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearModeloComponent } from '../crear-modelo/crear-modelo.component';
import { Subscription } from 'rxjs';
import { EliminarModeloComponent } from '../eliminar-modelo/eliminar-modelo.component';
import { EditarModeloComponent } from '../editar-modelo/editar-modelo.component';

@Component({
  selector: 'app-lista-modelo',
  templateUrl: './lista-modelo.component.html',
  styleUrl: './lista-modelo.component.css',
})
export class ListaModeloComponent {
  
  // Atributos.
  filtroBusqueda: any; // Variable utilizada para filtrar la lista de MODELOS.
  modelos: Modelo[] = [];
  subscription: Subscription = new Subscription();
  loading: boolean;

  // Constructor.
  constructor(private modeloService: ModeloService, private _dialog: MatDialog) {
    this.loading = true;
  }

  // Método llamado después de que Angular ha inicializado todas las directivas del componente.
  ngOnInit() {

    /**
     * Se suscribe al servicio de MODELO lista() para obtener la lista de MODELOS y cargar la lista de MODELOS
     * en el atributo MODELOS, además, este evento tiene una pantalla de carga personalizada que dura 8ms.
     */
    this.modeloService.lista().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.modelos = data.sort((a, b) => (a.id_modelo && b.id_modelo) ? a.id_modelo - b.id_modelo : 0);
          this.loading = false;
        }, 600);
      },
      error: (err) => {
        console.log(err);
      },
    });

    // Esta subscripción permite recargar la tabla cuando hay eventos que hacen que esta misma sea modificada.
    this.subscription = this.modeloService.actualizar$.subscribe(() => {
      this.modeloService.lista().subscribe({
        next: (data) => {
          this.modelos = data.sort((a, b) => (a.id_modelo && b.id_modelo) ? a.id_modelo - b.id_modelo : 0);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  // Método para abrir el diálogo de creación de un MODELO.
  abrirModalCrear() {
    this._dialog.open(CrearModeloComponent);
  }

  // Método para abrir el diálogo de edición de un MODELO.
  abrirModalEditar(modelo: Modelo) {
    this._dialog.open(EditarModeloComponent, {
      data: { modelo: modelo },
    });
  }

  // Método para abrir el diálogo de eliminación de un MODELO, pasando la información del MODELO.
  abrirModalEliminar(modelo: Modelo) {
    this._dialog.open(EliminarModeloComponent, {
      data: { modelo: modelo },
    });
  }
}
