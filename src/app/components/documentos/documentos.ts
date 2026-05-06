import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { TipoFichaService } from '../../services/tipo-ficha.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { DocumentoService } from '../../services/documento.service';
import { Documento } from '../../models/documento/documento';

@Component({
  selector: 'app-documentos',
  imports: [CommonModule, FormsModule],
  templateUrl: './documentos.html',
  styleUrl: './documentos.css',
})
export class Documentos implements OnInit {
  estadoFiltro: number = 1; //  1 = activos, 0 = inactivos
  detallesOriginal: Documento[] = [];
  productos: any[] = [];
  tipoficha: any[] = [];
  tipodocumento: any[] = [];
  detalles: Documento[] = [];

  nuevoDetalle: Documento = {
    id_documento: 0,
    id_producto: 0,
    id_tipo_ficha: 0,
    id_tipo_documento: 0,
    nombre_original: '',
    version: 1,
    pdf: null as any,
    estado: 1,
  };

  editando: boolean = false;

  constructor(
    private productoService: ProductoService,
    private tipoFichaService: TipoFichaService,
    private tipoDocumentoService: TipoDocumentoService,
    private documentoService: DocumentoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarDocumento();
    this.cargarTipoFicha();
    this.cargarTipoDocumento();
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.listar().subscribe({
      next: (resp: any) => {
        this.productos = resp.data;
        this.cdr.detectChanges();
      },
    });
  }

  cargarTipoDocumento() {
    this.tipoDocumentoService.listar().subscribe({
      next: (resp: any) => {
        this.tipodocumento = resp.data;
        this.cdr.detectChanges();
      },
    });
  }
  cargarTipoFicha() {
    this.tipoFichaService.listar().subscribe({
      next: (resp: any) => {
        this.tipoficha = resp.data;
        this.cdr.detectChanges();
      },
    });
  }

  // cargarFichaTecnica() {
  //   this.tipoFichaService.listar().subscribe({
  //     next: (resp: any) => {
  //       this.ficha = resp.data;
  //       this.cdr.detectChanges();
  //     },
  //   });
  // }
  cargarDocumento() {
    this.documentoService.listar().subscribe({
      next: (resp: any) => {
        // console.log('RESPUESTA BACKEND:', resp);
        this.detallesOriginal = resp.data;
        this.filtrar();
        this.cdr.detectChanges();
      },
    });
  }

  abrirModalNuevo() {
    this.editando = false;
    this.nuevoDetalle = {
      id_documento: 0,
      id_producto: 0,
      id_tipo_ficha: 0,
      id_tipo_documento: 0,
      nombre_original: '',
      version: 1,
      pdf: null as any,
      estado: 1,
    };
  }

  guardarDetalle() {
    const formData = new FormData();

    formData.append('id_producto', String(this.nuevoDetalle.id_producto));
    formData.append('id_tipo_ficha', String(this.nuevoDetalle.id_tipo_ficha));
    formData.append('id_tipo_documento', String(this.nuevoDetalle.id_tipo_documento));
    formData.append('nombre_original', this.nuevoDetalle.nombre_original);
    formData.append('version', String(this.nuevoDetalle.version));
    formData.append('estado', String(this.nuevoDetalle.estado));
    // formData.append('pdf', this.nuevoDetalle.pdf);
    formData.append('usuario', 'admin');

    if (this.archivoSeleccionado) {
      formData.append('archivo', this.archivoSeleccionado);
    }

    if (this.editando) {
      formData.append('id_documento', String(this.nuevoDetalle.id_documento));
    }

    // 🔥 ESTE ES EL DEBUG IMPORTANTE
    console.log('======= DATOS A ENVIAR =======');
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    console.log('==============================');

    // 🚀 llamada
    if (this.editando) {
      this.documentoService.actualizar(formData).subscribe({
        next: () => this.cargarDocumento(),
      });
    } else {
      this.documentoService.insertar(formData).subscribe({
        next: () => this.cargarDocumento(),
      });
    }

    this.editando = false;
  }

  editarDetalle(detalle: Documento) {
    this.nuevoDetalle = { ...detalle, pdf: detalle.nombre_original };

    // 🔥 ASEGURAR PDF
    this.nuevoDetalle.pdf = detalle.nombre_original; // 👈 ESTE ES EL CORRECTO

    // console.log('ID A ACTUALIZAR:', this.nuevoDetalle.id_documento);
    this.editando = true;
  }

  eliminarDetalle(id: number) {
    // this.detalles = this.detalles.filter(d => d.id !== id);
  }

  getNombreProducto(id: number): string {
    const prod = this.productos.find((p) => p.id_producto === id);
    return prod ? prod.nombre : 'Sin nombre';
  }
  getNombreTipoFicha(id: number): string {
    const tipo = this.tipoficha.find((t) => t.id_tipo_ficha === id);
    return tipo ? tipo.nombre : 'Sin nombre';
  }
  getNombreTipoDocumento(id: number): string {
    const tipo = this.tipodocumento.find((t) => t.id_tipo_documento === id);
    return tipo ? tipo.nombre : 'Sin nombre';
  }

  filtrar() {
    if (this.estadoFiltro === -1) {
      this.detalles = [...this.detallesOriginal];
    } else {
      this.detalles = this.detallesOriginal.filter((x) => x.estado == this.estadoFiltro);
    }
  }

  archivoSeleccionado!: File;

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF');
        return;
      }

      this.archivoSeleccionado = file;
      console.log('Archivo seleccionado:', file);
    }
  }
}
