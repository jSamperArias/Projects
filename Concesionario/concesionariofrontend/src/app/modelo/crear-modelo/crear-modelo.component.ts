import { Component, Inject } from '@angular/core';
import { Marca } from '../../models/marca';
import { Modelo } from '../../models/modelo';
import { FormBuilder, Validators } from '@angular/forms';
import { MarcaService } from '../../service/marca.service';
import { ModeloService } from '../../service/modelo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-modelo',
  templateUrl: './crear-modelo.component.html',
  styleUrl: './crear-modelo.component.css',
})
export class CrearModeloComponent {
  // Lista de marcas existentes mostradas en el formulario.
  marcas: Marca[] = [];

  // Constructor con las dependencias necesarias.
  constructor(
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<CrearModeloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    // Carga de los datos de las marcas existentes en la lista de MARCAS.
    this.marcaService.lista().subscribe({
      next: (data) => {
        this.marcas = data;
      },
      error: (err) => {
        this.toast.error('No se han podido recuperar los datos de las Marcas.');
      },
    });
  }

  // Formación del formBuilder que permite validar los datos del formulario antes de enviarlos.
  modeloForm = this.builder.group({
    nombre_modelo: this.builder.control('', Validators.required),
    uso_modelo: this.builder.control('', Validators.required),
    marca: this.builder.control('', Validators.required),
  });

  // Método que permite crear el modelo.
  crearModelo() {
    // Si el formulario es válido, continua el código.
    if (this.modeloForm.valid) {
      const nombreMarca = this.modeloForm.value.marca!;
      const marcaEncontrada = this.obtenerMarca(nombreMarca);

      // Si la marca no es null y se ha encontrado, continua el código.
      if (marcaEncontrada) {
        // Creamos un modelo con los datos del modelo a crear recogiendo los datos del formulario.
        const nuevoModelo = new Modelo(
          this.modeloForm.value.nombre_modelo!,
          this.modeloForm.value.uso_modelo!,
          marcaEncontrada
        );

        // Nos subscribimos al método crearModelo() del servicio de modelo y mostramos un toast en dependencia de si se inserto o no correctamente.
        this.modeloService.crearModelo(nuevoModelo).subscribe({
          next: (data) => {
            this.dialogRef.close(true);
            this.modeloForm.reset();
            this.toast.success('Registro añadido con éxito.');
          },
          error: (err) => {
            this.toast.error(
              'Error al crear el registro. Por favor, inténtelo de nuevo.'
            );
          },
        });
      }
    }
  }

  // Obtención de un objeto MARCA existente
  obtenerMarca(nombreMarca: string): Marca | undefined {
    return this.marcas.find((marca) => marca.nombre_marca === nombreMarca);
  }
}
