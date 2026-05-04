import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto/producto';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';


@Component({
  selector: 'app-producto',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Productos implements OnInit{

  estadoFiltro: number = 1; //  1 = activos, 0 = inactivos
  detallesOriginal: Producto[] = [];
  
  detalles: Producto[] = [];

  nuevoDetalle: Producto = {
    id_producto: 0,
    nombre: '',
    descripcion: '',
    estado: 1
  };

  editando: boolean = false;

  constructor(private tipoProductoService: ProductoService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.tipoProductoService.listar().subscribe({
      next: (resp: any) => {
        this.detallesOriginal  = resp.data;
        this.filtrar();

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar productos', err.error);
      }
    });
  }

  abrirModalNuevo() {
    this.editando = false;
    this.nuevoDetalle = { id_producto: 0, nombre: '', descripcion: '', estado: 1 };
  }

  
  guardarDetalle() {
    const payload = {
      ...this.nuevoDetalle,
      estado: this.nuevoDetalle.estado ? 1 : 0, // 🔥 FIX
      usuario: 'admin' // 🔥 luego lo sacas del login
    };

    if (this.editando) {
      this.tipoProductoService.actualizar(payload).subscribe((resp:any)=> {
        // console.log('RESPUESTA UPDATE:', resp);
        this.cargarProductos();
      });
    } else {
      this.tipoProductoService.insertar(payload).subscribe((resp:any) => {
        // console.log('RESPUESTA UPDATE:', resp);
        this.cargarProductos();
      });
    }

    this.editando = false;
  }

  editarDetalle(detalle: Producto) {
    this.nuevoDetalle = { ...detalle };
    this.editando = true;
  }

  getImagen(product: any): string {

  switch (product.nombre) {

    case 'Arandano':
      return 'assets/img/arandano.png';

    case 'Uva':
      return 'assets/img/uva.png';

    default:
      return 'assets/img/palta.png';
  }
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
