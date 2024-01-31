import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Tractor } from '../models/tractor';

@Injectable({
  providedIn: 'root',
})
export class TractorService {
  tractorURL = 'http://localhost:8080/concesionario/';

  // Observable utilizado para notificar actualizaciones en el servicio
  private _actualizar$ = new Subject<void>();

  constructor(private httpClient: HttpClient) {}

  /**
   * Permite hacer un observable que emite eventos cuando se actualizan los datos del servicio específico,
   * en este caso el del TRACTOR.
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
   * Método que obtiene la lista de TRACTORES desde el servidor.
   *
   * @returns un Observable que devuelve un array de objetos TRACTOR.
   */
  public lista(): Observable<Tractor[]> {
    return this.httpClient.get<Tractor[]>(this.tractorURL + 'tractor');
  }

  /**
   * Método que permite añadir un nuevo TRACTOR al servidor.
   *
   * @param tractor el TRACTOR que se va a crear.
   * @returns un Observable que devuelve el TRACTOR creado.
   */
  public crearTractor(tractor: Tractor): Observable<Tractor> {
    return this.httpClient
      .post<Tractor>(this.tractorURL + 'anyadirTractor', tractor)
      .pipe(
        tap(() => {
          this._actualizar$.next();
        })
      );
  }

  /**
   * Método para actualizar un TRACTOR existente en el servidor.
   *
   * @param id el identificador del TRACTOR a actualizar.
   * @param tractor el TRACTOR con los nuevos datos.
   * @returns un Observable que devuelve el TRACTOR actualizado.
   */
  public editarTractor(id: number, tractor: Tractor): Observable<Tractor> {
    return this.httpClient
      .put<Tractor>(this.tractorURL + `editarTractor/${id}`, tractor)
      .pipe(
        tap(() => {
          this._actualizar$.next();
        })
      );
  }

  /**
   * Método para eliminar un TRACTOR del servidor.
   *
   * @param id el identificador del TRACTOR a eliminar.
   * @returns un Observable que devuelve el TRACTOR eliminado.
   */
  public eliminarTractor(id: number): Observable<Tractor> {
    return this.httpClient
      .delete<Tractor>(this.tractorURL + `eliminarTractor/${id}`)
      .pipe(
        tap(() => {
          this._actualizar$.next();
        })
      );
  }
}
