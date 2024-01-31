import { Component, Inject } from '@angular/core';
import { Marca } from '../../models/marca';
import { ModeloService } from '../../service/modelo.service';
import { MarcaService } from '../../service/marca.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Modelo } from '../../models/modelo';

@Component({
  selector: 'app-editar-modelo',
  templateUrl: './editar-modelo.component.html',
  styleUrl: './editar-modelo.component.css',
})
export class EditarModeloComponent {
  // Variable que almacena las marcas que existen.
  marcas: Marca[] = [];

  // Constructor con las dependencias necesarias.
  constructor(
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<EditarModeloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    // Carga de los datos de los modelos en la variable MODELOS.
    this.marcaService.lista().subscribe({
      next: (data) => {
        this.marcas = data;
      },
      error: (err) => {
        this.toast.error('No se han podido recuperar los datos de las Marcas.');
      },
    });

    // Asignamos al formulario que aparece en el dialogo poniendo los datos del modelo a editar en el formulario.
    this.modeloForm.patchValue({
      nombre_modelo: this.data.modelo.nombre_modelo,
      uso_modelo: this.data.modelo.uso_modelo,
      marca: this.data.modelo.marca.nombre_marca,
    });
  }

  // Creación del formBuilder que permite validar los datos antes de su envío.
  modeloForm = this.builder.group({
    nombre_modelo: this.builder.control('', Validators.required),
    uso_modelo: this.builder.control('', Validators.required),
    marca: this.builder.control('', Validators.required),
  });

  // Método que permite editar un modelo.
  editarModelo() {
    // Si el formulario es válido, seguimos ejecutando el código.
    if (this.modeloForm.valid) {
      const nombreMarca = this.modeloForm.value.marca!;
      const marcaEncontrada = this.obtenerMarca(nombreMarca);

      // Si existe la marca y no es null, sigue con el código.
      if (marcaEncontrada) {
        // Creación del modelo a editar con los nuevos datos.
        const nuevoModelo = new Modelo(
          this.modeloForm.value.nombre_modelo!,
          this.modeloForm.value.uso_modelo!,
          marcaEncontrada
        );

        // Llamamos al método para editar el modelo pasandole los nuevos datos del tractor y su id.
        this.modeloService.editarModelo(this.data.modelo.id_modelo!, nuevoModelo).subscribe({
            next: (_) => {
              this.dialogRef.close(true);
              this.modeloForm.reset();
              this.toast.success('Registro editado con éxito.');
            },
            error: (_) => {
              this.toast.error('Error al editar el registro. Por favor, inténtelo de nuevo.');
            },
          });
      }
    }
  }

  // Obtiene un modelo de la lista de MARCAS y lo devuelve.
  obtenerMarca(nombreMarca: string): Marca | undefined {
    return this.marcas.find((marca) => marca.nombre_marca === nombreMarca);
  }
}
