import { Producto } from "../producto/producto";
import { tipoDocumento } from "../tipo-documento/tipo-documento";
import { tipoFicha } from "../tipo-ficha/tipo-ficha";

export class Ficha_Tecnica {
    id: number = 0;
    producto!: Producto;
    tipoFicha!: tipoFicha;
    tipoDocumento!: tipoDocumento;
    nombreDocumento: string = '';
    pdf!: File;
    estado: boolean = true;
}