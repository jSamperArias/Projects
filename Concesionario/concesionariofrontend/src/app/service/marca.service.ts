import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  marcaURL = 'http://localhost:8080/concesionario/';

  // Observable utilizado para notificar actualizaciones en el servicio
  private _actualizar$ = new Subject<void>();

  constructor(private httpClient: HttpClient) {}

  /**
   * Permite hacer un observable que emite eventos cuando se actualizan los datos del servicio específico,
   * en este caso el de la MARCA.
   *
   * @remarks
   * Los suscriptores pueden escuchar este observable para recibir notificaciones cuando
   * se realiza alguna operación que requiere una actualización en los datos del servicio.
   *
   * @returns un Observable<void> que devuelve eventos de actualización.
   */
  get actualizar$() {
    return this._actualizar$;
  }

  /**
   * Método que obtiene la lista de MARCAS desde el servidor.
   *
   * @returns un Observable que devuelve un array de objetos MARCA.
   */
  public lista(): Observable<Marca[]> {
    return this.httpClient.get<Marca[]>(this.marcaURL + 'marca');
  }

  /**
   * Método que permite añadir una nueva MARCA al servidor.
   *
   * @param marca la MARCA que se va a crear.
   * @returns un Observable que devuelve la MARCA creada.
   */
  public crearMarca(marca: Marca): Observable<Marca> {
    return this.httpClient
      .post<Marca>(this.marcaURL + 'anyadirMarca', marca)
      .pipe(
        tap(() => {
          this._actualizar$.next();
        })
      );
  }

  /**
   * Método para actualizar una MARCA existente en el servidor.
   *
   * @param id el identificador de la MARCA a actualizar.
   * @param marca la MARCA con los nuevos datos.
   * @returns un Observable que devuelve la MARCA actualizada.
   */
  public editarMarca(id: number, marca: Marca): Observable<Marca> {
    return this.httpClient
      .put<Marca>(this.marcaURL + `editarMarca/${id}`, marca)
      .pipe(
        tap(() => {
          this._actualizar$.next();
        })
      );
  }

  /**
   * Método para eliminar una MARCA del servidor.
   *
   * @param id el identificador de la MARCA a eliminar.
   * @returns un Observable que devuelve la MARCA eliminada.
   */
  public eliminarMarca(id: number): Observable<Marca> {
    return this.httpClient
      .delete<Marca>(this.marcaURL + `eliminarMarca/${id}`)
      .pipe(
        tap(() => {
          this._actualizar$.next();
        })
      );
  }
}
