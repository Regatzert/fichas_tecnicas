import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductDetalle } from '../../models/producto-detalle/producto-detalle';

@Component({
  selector: 'app-producto-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.css',
})
export class ProductoList implements OnInit {

  productoId!: number;

  detalles: ProductDetalle[] = [];

  nuevoDetalle: ProductDetalle = {
    id: 0,
    nombre: '',
    descripcion: ''
  };

  editando: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Producto ID:', this.productoId);
  }

  guardarDetalle() {
    if (this.editando) {
      this.editando = false;
      this.nuevoDetalle = { id: 0, nombre: '', descripcion: '' };
      return;
    }

    const nuevo = {
      ...this.nuevoDetalle,
      id: this.detalles.length + 1
    };

    this.detalles.push(nuevo);

    this.nuevoDetalle = { id: 0, nombre: '', descripcion: '' };
  }

  editarDetalle(detalle: ProductDetalle) {
    this.nuevoDetalle = { ...detalle };
    this.editando = true;
  }

  eliminarDetalle(id: number) {
    this.detalles = this.detalles.filter(d => d.id !== id);
  }

}
