import { Component, Inject, OnInit } from '@angular/core';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../service/marca.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-marca',
  templateUrl: './editar-marca.component.html',
  styleUrls: ['./editar-marca.component.css'],
})
export class EditarMarcaComponent implements OnInit {
  // Variable que almacena la marca pasa por el dialogo.
  marca: Marca;

  // Constructor con las dependencias necesarias.
  constructor(
    private dialogRef: MatDialogRef<EditarMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { marca: Marca },
    private builder: FormBuilder,
    private toast: ToastrService,
    private marcaService: MarcaService
  ) {
    this.marca = data.marca;
  }

  ngOnInit() {
    // Asignamos al formulario que aparece en el dialogo poniendo los datos de la marca a editar en el formulario.
    this.marcaForm.patchValue({
      nombre_marca: this.data.marca.nombre_marca,
    });
  }

  // Creación del formBuilder que permite validar los datos antes de su envío.
  marcaForm = this.builder.group({
    nombre_marca: this.builder.control('', Validators.required),
  });

  // Método que permite editar una marca.
  editarMarca() {
    // Si el formulario es válido, seguimos ejecutando el código.
    if (this.marcaForm.valid) {
      // Creación de la marca a editar con los nuevos datos.
      const nuevaMarca = new Marca(this.marcaForm.value.nombre_marca!);

      // Llamamos al método para editar la marca pasandole los nuevos datos de la marca y su id.
      this.marcaService
        .editarMarca(this.data.marca.id_marca!, nuevaMarca).subscribe({
          next: (_) => {
            this.dialogRef.close(true);
            this.marcaForm.reset();
            this.toast.success('Registro editado con éxito.');
          },
          error: (err) => {
            if (err.status === 500) {
              this.toast.error('La marca ya está registrada.');
            } else {
              this.toast.error('Error al editar el registro. Por favor, inténtelo de nuevo.');
            }
          },
        });
    }
  }
}
