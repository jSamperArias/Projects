import { Component, Inject } from '@angular/core';
import { Modelo } from '../../models/modelo';
import { ModeloService } from '../../service/modelo.service';
import { TractorService } from '../../service/tractor.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Tractor } from '../../models/tractor';

@Component({
  selector: 'app-editar-tractor',
  templateUrl: './editar-tractor.component.html',
  styleUrl: './editar-tractor.component.css',
})
export class EditarTractorComponent {
  // Variable que almacena los modelos que existen.
  modelos: Modelo[] = [];

  // Constructor con las dependencias necesarias.
  constructor(
    private modeloService: ModeloService,
    private tractorService: TractorService,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<EditarTractorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    // Carga de los datos de los modelos en la variable MODELOS.
    this.modeloService.lista().subscribe({
      next: (data) => {
        this.modelos = data;
      },
      error: (err) => {
        this.toast.error(
          'No se han podido recuperar los datos de los de los Modelos.'
        );
      },
    });

    // Asignamos al formulario que aparece en el dialogo poniendo los datos del tractor a editar en el formulario.
    this.tractorForm.patchValue({
      nombre_tractor: this.data.tractor.nombre_tractor,
      potencia_tractor: this.data.tractor.potencia_tractor,
      ancho_tractor: this.obtenerDimesionesTractor('ancho'),
      alto_tractor: this.obtenerDimesionesTractor('alto'),
      modelo: this.data.tractor.modelo.nombre_modelo,
    });
  }

  // Creación del formBuilder que permite validar los datos antes de su envío.
  tractorForm = this.builder.group({
    nombre_tractor: this.builder.control('', Validators.required),
    potencia_tractor: this.builder.control('', Validators.required),
    modelo: this.builder.control('', Validators.required),
    ancho_tractor: this.builder.control('', Validators.required),
    alto_tractor: this.builder.control('', Validators.required),
  });

  // Método para editar un tractor.
  editarTractor() {
    // Si el formulario es válido, seguimos ejecutando el código.
    if (this.tractorForm.valid) {
      const nombreModelo = this.tractorForm.value.modelo!;
      const modeloEncontrado = this.obtenerModelo(nombreModelo);

      // Si existe el módelo y no es null, sigue con el código.
      if (modeloEncontrado) {
        // Creación del tractor a editar con los nuevos datos.
        const nuevoTractor = new Tractor(
          this.tractorForm.value.nombre_tractor!,
          parseInt(this.tractorForm.value.potencia_tractor!),
          this.tractorForm.value.ancho_tractor! +
            'x' +
          this.tractorForm.value.alto_tractor!,
          modeloEncontrado
        );

        // Llamamos al método para editar el tractor pasandole los nuevos datos del tractor y su id.
        this.tractorService.editarTractor(this.data.tractor.id_tractor!, nuevoTractor).subscribe({
            next: (_) => {
              this.dialogRef.close(true);
              this.tractorForm.reset();
              this.toast.success('Registro editado con éxito.');
            },
            error: (_) => {
              this.toast.error('Error al editar el registro. Por favor, inténtelo de nuevo.');
            },
          });
      }
    }
  }

  // Obtiene un modelo de la lista de MODELOS y lo devuelve.
  obtenerModelo(nombreModelo: string): Modelo | undefined {
    return this.modelos.find((modelo) => modelo.nombre_modelo === nombreModelo);
  }

  // Obtención de las dimensiones de un TRACTOR por separado.
  obtenerDimesionesTractor(ancAlt: string): string {
    const arr: Array<string> = this.data.tractor.dimensiones_tractor.split('x');
    return ancAlt === 'ancho' ? arr[0] : arr[1];
  }
}
