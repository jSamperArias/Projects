import { Marca } from "./marca";

export class Modelo {
    id_modelo?: number;
    nombre_modelo: string;
    uso_modelo: string;
    marca: Marca;

    constructor(nombre_modelo: string, uso_modelo: string, marca: Marca){
        this.nombre_modelo = nombre_modelo
        this.uso_modelo = uso_modelo
        this.marca = marca
    }
}
