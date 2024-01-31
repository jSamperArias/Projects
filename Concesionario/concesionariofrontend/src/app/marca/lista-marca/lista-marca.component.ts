/**
 * Este componente Angular representa la lista de MARCAS.
 *
 * Se encarga de gestionar la visualización de los MARCAS, así como de interactuar con el servicio correspondiente.
 */

import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarcaService } from '../../service/marca.service';
import { Marca } from '../../models/marca';
import { MatDialog } from '@angular/material/dialog';
import { CrearMarcaComponent } from '../crear-marca/crear-marca.component';
import { EliminarMarcaComponent } from '../eliminar-marca/eliminar-marca.component';
import { EditarMarcaComponent } from '../editar-marca/editar-marca.component';

@Component({
  selector: 'app-lista-marca',
  templateUrl: './lista-marca.component.html',
  styleUrl: './lista-marca.component.css',
})
export class ListaMarcaComponent {

  // Atributos.
  filtroBusqueda: any; // Variable utilizada para filtrar la lista de MODELOS.
  marcas: Marca[] = [];
  subscription: Subscription = new Subscription();
  loading: boolean;

  // Constructor.
  constructor(private marcaService: MarcaService, private _dialog: MatDialog) {
    this.loading = true;
  }

  // Método llamado después de que Angular ha inicializado todas las directivas del componente.
  ngOnInit() {

    /**
     * Se suscribe al servicio de MARCA lista() para obtener la lista de MARCAS y cargar la lista de MARCAS
     * en el atributo MARCAS, además, este evento tiene una pantalla de carga personalizada que dura 8ms.
     */
    this.marcaService.lista().subscribe({
      next: (data) => {
        setTimeout(() => {
          this.marcas = data.sort((a, b) => (a.id_marca && b.id_marca) ? a.id_marca - b.id_marca : 0);
          this.loading = false;
        }, 600);
      },
      error: (err) => {
        console.log(err);
      },
    });

    // Esta subscripción permite recargar la tabla cuando hay eventos que hacen que esta misma sea modificada.
    this.subscription = this.marcaService.actualizar$.subscribe(() => {
      this.marcaService.lista().subscribe({
        next: (data) => {
          this.marcas = data.sort((a, b) => (a.id_marca && b.id_marca) ? a.id_marca - b.id_marca : 0);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  // Método para abrir el diálogo de creación de una MARCA.
  abrirModalCrear() {
    this._dialog.open(CrearMarcaComponent);
  }

  // Método para abrir el diálogo de edición de una MARCA.
  abrirModalEliminar(marca: Marca) {
    this._dialog.open(EliminarMarcaComponent, {
      data: { marca: marca },
    });
  }

  // Método para abrir el diálogo de eliminación de una MARCA, pasando la información del MARCA.
  abrirModalEditar(marca: Marca) {
    this._dialog.open(EditarMarcaComponent, {
      data: { marca: marca },
    });
  }
}
