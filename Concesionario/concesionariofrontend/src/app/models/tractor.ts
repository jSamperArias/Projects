import { Modelo } from "./modelo";

export class Tractor {
    // La id, como la genera lo que es la BBDD, la ponemos como opcional.
    id_tractor?: number;
    nombre_tractor: string;
    potencia_tractor: number;
    dimensiones_tractor: string;
    modelo: Modelo;

    constructor(nombre_tractor: string, potencia_tractor: number, dimensiones_tractor: string, modelo: Modelo){
        this.nombre_tractor = nombre_tractor
        this.potencia_tractor = potencia_tractor
        this.dimensiones_tractor = dimensiones_tractor
        this.modelo = modelo
    }
}

