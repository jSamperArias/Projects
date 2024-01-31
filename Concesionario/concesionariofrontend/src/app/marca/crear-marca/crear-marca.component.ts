import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../service/marca.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrl: './crear-marca.component.css',
})
export class CrearMarcaComponent {
  // Constructor con las dependencias necesarias.
  constructor(
    private toast: ToastrService,
    private builder: FormBuilder,
    private marcaService: MarcaService,
    private dialogRef: MatDialogRef<CrearMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Formación del formBuilder que permite validar los datos del formulario antes de enviarlos.
  marcaForm = this.builder.group({
    nombre_marca: this.builder.control('', Validators.required),
  });

  // Método que permite crear la marca.
  crearMarca() {
    // Creamos una marca con los datos de la marca a crear recogiendo los datos del formulario.
    const marca: Marca = new Marca(this.marcaForm.value.nombre_marca!);

    // Si el formulario es válido, continua el código.
    if (this.marcaForm.valid) {
      // Nos subscribimos al método crearMarca() del servicio de marca y mostramos un toast en dependencia de si se inserto o no correctamente.
      this.marcaService.crearMarca(marca).subscribe({
        next: (data) => {
          this.dialogRef.close(true);
          this.marcaForm.reset();
          this.toast.success('Registro añadido con éxito.');
        },
        error: (err) => {
          if (err.status === 400) {
            this.toast.error('La marca ya está registrada.');
          } else {
            this.toast.error(
              'Error al crear el registro. Por favor, inténtelo de nuevo.'
            );
          }
        },
      });
    }
  }
}
