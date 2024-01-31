import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../service/marca.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eliminar-marca',
  templateUrl: './eliminar-marca.component.html',
  styleUrls: ['./eliminar-marca.component.css']
})
export class EliminarMarcaComponent {
  // Objeto Marca que se eliminará.
  marca: Marca;

  // Constructor que recibe las dependencias necesarias.
  constructor(
    private dialogRef: MatDialogRef<EliminarMarcaComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { marca: Marca }, 
    private toast: ToastrService, 
    private marcaService: MarcaService 
  ) {
    // Inicialización del objeto MARCA con los datos recibidos.
    this.marca = data.marca;
  }

  // Método para eliminar la MARCA.
  eliminarMarca() {
    this.marcaService.eliminarMarca(this.marca.id_marca!).subscribe({
      next: (data) => {
        // Cierre del diálogo y mensaje de éxito si la operación es exitosa.
        this.dialogRef.close(true);
        this.toast.success("Registro eliminado con éxito.");
      },
      error: (err) => {
        // Manejo de errores específicos según el código de estado HTTP.
        if (err.status === 400){
          this.toast.error("Existen campos asociados, no puede eliminar dicho registro.")
        } else {
          this.toast.error("Error al eliminar el registro. Por favor, inténtelo de nuevo.")
        }
      },
    });
  }

}
