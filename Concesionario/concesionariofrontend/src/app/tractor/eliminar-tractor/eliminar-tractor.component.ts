import { Component, Inject } from '@angular/core';
import { Tractor } from '../../models/tractor';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TractorService } from '../../service/tractor.service';

@Component({
  selector: 'app-eliminar-tractor',
  templateUrl: './eliminar-tractor.component.html',
  styleUrls: ['./eliminar-tractor.component.css'],
})
export class EliminarTractorComponent {
  // Objeto Tractor que se eliminará.
  tractor: Tractor;

  // Constructor que recibe las dependencias necesarias.
  constructor(
    private dialogRef: MatDialogRef<EliminarTractorComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { tractor: Tractor }, 
    private toast: ToastrService, 
    private tractorService: TractorService 
  ) {
    // Inicialización del objeto TRACTOR con los datos recibidos.
    this.tractor = data.tractor;
  }

  // Método para eliminar el TRACTOR.
  eliminarTractor() {
    this.tractorService.eliminarTractor(this.tractor.id_tractor!).subscribe({
      next: (_) => {
        // Cierre del diálogo y mensaje de éxito si la operación es exitosa.
        this.dialogRef.close(true);
        this.toast.success('Registro eliminado con éxito.');
      },
      error: (_) => {
        // Mensaje de error si la operación no es exitosa.
        this.toast.error('Error al eliminar el registro. Por favor, inténtelo de nuevo.');
      },
    });
  }
}
