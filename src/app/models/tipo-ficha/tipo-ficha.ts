import { Producto } from "../producto/producto";

export class tipoFicha {
    id:number = 0;
    producto!: Producto;
    descripcion: string = '';
    order: number = 1;
}