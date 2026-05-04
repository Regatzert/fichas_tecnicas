import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tipoFicha } from '../../models/tipo-ficha/tipo-ficha';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { TipoFichaService } from '../../services/tipo-ficha.service';

@Component({
  selector: 'app-tipo-ficha',
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-ficha.html',
  styleUrl: './tipo-ficha.css',
})
export class TipoFicha  implements OnInit {
  estadoFiltro: number = 1; //  1 = activos, 0 = inactivos
  detallesOriginal: tipoFicha[] = [];
  productos: any[] = [];
  detalles: tipoFicha[] = [];

  nuevoDetalle: tipoFicha = {
    id_tipo_ficha: 0,
    id_producto: 0,
    nombre: 'nombre',
    descripcion: 'documento',
    orden: 2,
    estado: 1,
  };

  editando: boolean = false;

  constructor(private productoService: ProductoService, 
    private tipoFichaService: TipoFichaService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.documentoId = Number(this.route.snapshot.paramMap.get('id'));
  this.cargarTipoFicha();
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

 cargarTipoFicha() {
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
    this.nuevoDetalle = { id_tipo_ficha: 0, id_producto: {} as any, nombre: '', descripcion: '', orden: 1, estado: 1 };
  }

  
  guardarDetalle() {
    const payload = {
      ...this.nuevoDetalle,
      estado: this.nuevoDetalle.estado ? 1 : 0, // 🔥 FIX
      usuario: 'admin' // 🔥 luego lo sacas del login
    };

    if (this.editando) {
      this.tipoFichaService.actualizar(payload).subscribe((resp:any)=> {
        console.log('RESPUESTA UPDATE:', resp);
        this.cargarTipoFicha();
      });
    } else {
      this.tipoFichaService.insertar(payload).subscribe((resp:any) => {
        console.log('RESPUESTA UPDATE:', resp);
        this.cargarTipoFicha();
      });
    }

    this.editando = false;
  }
  editarDetalle(detalle: tipoFicha) {
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

