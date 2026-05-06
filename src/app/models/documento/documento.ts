export interface Documento {
  id_documento: number;
  id_producto: number;
  id_tipo_ficha: number;
  id_tipo_documento: number;
  nombre_original: string;
  version: number,
  pdf: string;
  estado: number;
}