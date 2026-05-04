export interface Ficha_Tecnica {
    id_ficha_tecnica: number;
    id_producto : number;
    id_tipo_ficha: number;
    id_tipo_documento: number;
    nombre: string;
    pdf: File;
    estado: number;
}