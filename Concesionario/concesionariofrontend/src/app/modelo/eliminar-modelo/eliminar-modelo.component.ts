import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Modelo } from '../../models/modelo';
import { ModeloService } from '../../service/modelo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eliminar-modelo',
  templateUrl: './eliminar-modelo.component.html',
  styleUrls: ['./eliminar-modelo.component.css'],
})
export class EliminarModeloComponent {
  // Objeto MODELO que se eliminará.
  modelo: Modelo;

  // Constructor que recibe las dependencias necesarias.
  constructor(
    private dialogRef: MatDialogRef<EliminarModeloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modelo: Modelo },
    private toast: ToastrService,
    private modeloService: ModeloService
  ) {
    // Inicialización del objeto Modelo con los datos recibidos.
    this.modelo = data.modelo;
  }

  // Método para eliminar el MODELO.
  eliminarModelo() {
    this.modeloService.eliminarModelo(this.modelo.id_modelo!).subscribe({
      next: (_) => {
        // Cierre del diálogo y mensaje de éxito si la operación es exitosa.
        this.dialogRef.close(true);
        this.toast.success('Registro eliminado con éxito.');
      },
      error: (err) => {
        // Manejo de errores específicos según el código de estado HTTP.
        if (err.status === 400) {
          this.toast.error('Existen campos asociados, no puede eliminar dicho registro.');
        } else {
          this.toast.error('Error al eliminar el registro. Por favor, inténtelo de nuevo.');
        }
      },
    });
  }
}
