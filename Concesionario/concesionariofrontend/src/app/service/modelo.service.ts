import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Modelo } from '../models/modelo';

@Injectable({
  providedIn: 'root',
})
export class ModeloService {
  modeloURL = 'http://localhost:8080/concesionario/';

  // Observable utilizado para notificar actualizaciones en el servicio
  private _actualizar$ = new Subject<void>();

  constructor(private httpClient: HttpClient) {}

  /**
   * Permite hacer un observable que emite eventos cuando se actualizan los datos del servicio específico,
   * en este caso el del MODELO.
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
   * Método que obtiene la lista de MODELOS desde el servidor.
   *
   * @returns un Observable que devuelve un array de objetos MODELO.
   */
  public lista(): Observable<Modelo[]> {
    return this.httpClient.get<Modelo[]>(this.modeloURL + 'modelo');
  }

  /**
   * Método que permite añadir un nuevo MODELO al servidor.
   *
   * @param modelo el MODELO que se va a crear.
   * @returns un Observable que devuelve el MODELO creado.
   */
  public crearModelo(modelo: Modelo): Observable<Modelo> {
    return this.httpClient
      .post<Modelo>(this.modeloURL + 'anyadirModelo', modelo)
      .pipe(
        tap(() => {
          this._actualizar$.next();
        })
      );
  }

  /**
   * Método para actualizar un MODELO existente en el servidor.
   *
   * @param id el identificador del MODELO a actualizar.
   * @param modelo el MODELO con los nuevos datos.
   * @returns un Observable que devuelve el MODELO actualizado.
   */
  public editarModelo(id: number, modelo: Modelo): Observable<Modelo> {
    return this.httpClient
      .put<Modelo>(this.modeloURL + `editarModelo/${id}`, modelo)
      .pipe(
        tap(() => {
          this._actualizar$.next();
        })
      );
  }

  /**
   * Método para eliminar un MODELO del servidor.
   *
   * @param id el identificador del MODELO a eliminar.
   * @returns un Observable que devuelve el MODELO eliminado.
   */
  public eliminarModelo(id: number): Observable<Modelo> {
    return this.httpClient
      .delete<Modelo>(this.modeloURL + `eliminarModelo/${id}`)
      .pipe(
        tap(() => {
          this._actualizar$.next();
        })
      );
  }
}
