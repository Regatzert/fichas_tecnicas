import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Ficha_Tecnica } from '../../models/ficha-tecnica/ficha-tecnica';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoFichaService } from '../../services/tipo-ficha.service';
import { ProductoService } from '../../services/producto.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';

@Component({
  selector: 'app-ficha-tecnica',
  imports: [CommonModule, FormsModule],
  templateUrl: './ficha-tecnica.html',
  styleUrl: './ficha-tecnica.css',
})
export class FichaTecnica implements OnInit {
  estadoFiltro: number = 1; //  1 = activos, 0 = inactivos
  detallesOriginal: Ficha_Tecnica[] = [];
  productos: any[] = [];
  tipoficha: any[] = [];
  tipodocumento: any[] = [];
  detalles: Ficha_Tecnica[] = [];

  nuevoDetalle: Ficha_Tecnica = {
    id_ficha_tecnica: 0,
    id_producto: 0,
    id_tipo_ficha: 0,
    id_tipo_documento: 0,
    nombre: '',
    pdf: new File([], ''),
    estado: 1
  };

  editando: boolean = false;

  constructor(private productoService: ProductoService, 
      private tipoFichaService: TipoFichaService,
      private tipoDocumentoService: TipoDocumentoService,
      private cdr: ChangeDetectorRef
      ) {}

  ngOnInit(): void {
    this.cargarFichaTecnica();
    this.cargarTipoFicha();
    this.cargarTipoDocumento();
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.listar().subscribe({
      next: (resp: any) => {
        this.productos = resp.data;
        this.cdr.detectChanges();
      }
    });
  }

    cargarTipoDocumento() {
    this.tipoDocumentoService.listar().subscribe({
      next: (resp: any) => {
        this.tipodocumento = resp.data;
        this.cdr.detectChanges();
      }
    });
  }
   cargarTipoFicha() {
  this.tipoFichaService.listar().subscribe({
    next: (resp: any) => {
      this.tipoficha = resp.data;
      this.cdr.detectChanges();
    }
  });
}

  cargarFichaTecnica() {
  this.tipoFichaService.listar().subscribe({
    next: (resp: any) => {
      this.detallesOriginal = resp.data;
      this.filtrar();
      this.cdr.detectChanges();
    }
  });
}

  abrirModalNuevo() {
    this.editando = false;
    this.nuevoDetalle = { id_ficha_tecnica: 0, id_producto: {} as any, id_tipo_ficha: {} as any, id_tipo_documento: {} as any, nombre: '', pdf: new File([], ''), estado: 1  };
  }

  
  guardarDetalle() {
    if (this.editando) {
      const index = this.detalles.findIndex(d => d.id_ficha_tecnica === this.nuevoDetalle.id_ficha_tecnica);
      this.detalles[index] = { ...this.nuevoDetalle };
    } else {
      const nuevo = {
        ...this.nuevoDetalle,
        id_ficha_tecnica: this.detalles.length + 1
      };
      this.detalles.push(nuevo);
    }

    this.nuevoDetalle = { id_ficha_tecnica: 0, id_producto: {} as any, id_tipo_ficha: {} as any, id_tipo_documento: {} as any, nombre: '', pdf: new File([], ''), estado: 1 };
    this.editando = false;
  }
   editarDetalle(detalle: Ficha_Tecnica) {
     this.nuevoDetalle = { ...detalle };
     this.editando = true;
   }
 
   eliminarDetalle(id: number) {
     // this.detalles = this.detalles.filter(d => d.id !== id);
   }
 
   getNombreProducto(id: number): string {
   const prod = this.productos.find(p => p.id_producto === id);
   return prod ? prod.nombre : 'Sin nombre';
  }
  getNombreTipoFicha(id: number): string {
    const tipo = this.tipoficha.find(t => t.id_tipo_ficha === id);
    return tipo ? tipo.nombre : 'Sin nombre';
  }
  getNombreTipoDocumento(id: number): string {
    const tipo = this.tipodocumento.find(t => t.id_tipo_documento === id);
    return tipo ? tipo.nombre : 'Sin nombre';
  }

filtrar() {
  if (this.estadoFiltro === -1) {
    this.detalles = [...this.detallesOriginal];
  } else {
    this.detalles = this.detallesOriginal.filter(
      x => x.estado == this.estadoFiltro
    );
  }
}


}


