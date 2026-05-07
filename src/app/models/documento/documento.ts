export interface Documento {
  id_documento: number;
  id_producto: number;
  id_tipo_documento: number;
  id_tipo_ficha: number;
  nombre_original: string;
  nombre_interno?: string;
  ruta_fisica?: string;
  version: number,
  estado: number;
}