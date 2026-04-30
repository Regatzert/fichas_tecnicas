import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoDetalle } from '../../models/producto-detalle/producto-detalle';
import { Location } from '@angular/common';

@Component({
  selector: 'app-producto-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.css',
})
export class ProductoList implements OnInit {

  productoId!: number;

  detalles: ProductoDetalle[] = [
    {
      id: 1,
      nombre: 'Detalle 1',
      descripcion: 'Descripción del detalle 1',
      estado: true
    }
  ];

  nuevoDetalle: ProductoDetalle = {
    id: 0,
    nombre: '',
    descripcion: '',
    estado: true
  };

  editando: boolean = false;

  constructor(private route: ActivatedRoute,  private location: Location) {}

  volver() {
  this.location.back();
}

  ngOnInit(): void {
      this.productoId = Number(this.route.snapshot.paramMap.get('id'));
      console.log('Producto ID:', this.productoId);
    }
  
    abrirModalNuevo() {
      this.editando = false;
      this.nuevoDetalle = { id: 0, nombre: '', descripcion: '', estado: true };
    }
  
    
    guardarDetalle() {
      if (this.editando) {
        const index = this.detalles.findIndex(d => d.id === this.nuevoDetalle.id);
        this.detalles[index] = { ...this.nuevoDetalle };
      } else {
        const nuevo = {
          ...this.nuevoDetalle,
          id: this.detalles.length + 1
        };
        this.detalles.push(nuevo);
      }
  
      this.nuevoDetalle = { id: 0, nombre: '', descripcion: '', estado: true };
      this.editando = false;
    }
  
    editarDetalle(detalle: ProductoDetalle) {
      this.nuevoDetalle = { ...detalle };
      this.editando = true;
    }
  
    eliminarDetalle(id: number) {
      this.detalles = this.detalles.filter(d => d.id !== id);
    }

}
