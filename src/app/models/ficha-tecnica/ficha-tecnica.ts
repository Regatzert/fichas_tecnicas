import { Producto } from "../producto/producto";
import { tipoDocumento } from "../tipo-documento/tipo-documento";
import { tipoFicha } from "../tipo-ficha/tipo-ficha";

export class FichaTecnica {
    id: number = 0;
    producto!: Producto;
    tipoFicha!: tipoFicha;
    tipoDocumento!: tipoDocumento;
    nombreDocumento: string = '';
    pdf!: File;
}