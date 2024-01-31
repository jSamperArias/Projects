import { Component, Inject } from '@angular/core';
import { TractorService } from '../../service/tractor.service';
import { ModeloService } from '../../service/modelo.service';
import { Modelo } from '../../models/modelo';
import { Tractor } from '../../models/tractor';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-tractor',
  templateUrl: './crear-tractor.component.html',
  styleUrl: './crear-tractor.component.css',
})
export class CrearTractorComponent {
  // Lista de modelos existentes mostradas en el formulario.
  modelos: Modelo[] = [];

  // Constructor con las dependencias necesarias.
  constructor(
    private modeloService: ModeloService,
    private tractorService: TractorService,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<CrearTractorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    // Carga de los datos de modelos existentes en la lista de MODELOS.
    this.modeloService.lista().subscribe({
      next: (data) => {
        this.modelos = data;
      },
      error: (err) => {
        this.toast.error('No se han podido recuperar los datos de los de los Modelos.');
      },
    });
  }

  // Formación del formBuilder que permite validar los datos del formulario antes de enviarlos.
  tractorForm = this.builder.group({
    nombre_tractor: this.builder.control('', Validators.required),
    potencia_tractor: this.builder.control('', Validators.required),
    modelo: this.builder.control('', Validators.required),
    ancho_tractor: this.builder.control('', Validators.required),
    alto_tractor: this.builder.control('', Validators.required),
  });


  // Método que permite crear el tractor.
  crearTractor() {
    // Si el formulario es válido, continua el código.
    if (this.tractorForm.valid) {
      const nombreModelo = this.tractorForm.value.modelo!;
      const modeloEncontrado = this.obtenerModelo(nombreModelo);

      // Si el modelo no es null y se ha encontrado, continua el código.
      if (modeloEncontrado) {
        // Creamos un tractor con los datos de el tractor a crear recogiendo los datos del formulario.
        const nuevoTractor = new Tractor(
          this.tractorForm.value.nombre_tractor!,
          parseInt(this.tractorForm.value.potencia_tractor!),
          this.tractorForm.value.ancho_tractor! + 'x' + this.tractorForm.value.alto_tractor!,
          modeloEncontrado
        );

        // Nos subscribimos al método crearTractor() del servicio de tractor y mostramos un toast en dependencia de si se inserto o no correctamente.
        this.tractorService.crearTractor(nuevoTractor).subscribe({
          next: (data) => {
            this.dialogRef.close(true);
            this.tractorForm.reset();
            this.toast.success('Registro añadido con éxito.');
          },
          error: (err) => {
            this.toast.error('Error al crear el registro. Por favor, inténtelo de nuevo.');
          },
        });
      }
    }
  }

  // Obtención de un objeto modelo existente de la lista de MODELOS.
  obtenerModelo(nombreModelo: string): Modelo | undefined {
    return this.modelos.find((modelo) => modelo.nombre_modelo === nombreModelo);
  }
}
