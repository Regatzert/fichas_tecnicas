import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto/producto';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-producto',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Productos implements OnInit{
  documentoId!: number;

  products: Producto[] = [
    {
      id: 1,
      nombre: 'Arándano',
      descripcion: 'Arándano fresco y jugoso',
      imagen: '../../../assets/img/arandano.png',
      estado: true
    },
    {
      id: 2,
      nombre: 'Palta',
      descripcion: 'Palta madura y cremosa',
      imagen: '../../../assets/img/palta.png',
      estado: true  
    },
    {
      id: 3,
      nombre: 'Uva',
      descripcion: 'Uva dulce y jugosa',
      imagen: '../../../assets/img/uva.png',
      estado: true
    }
  ];

  nuevoDetalle: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    estado: true
  };

  editando: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.documentoId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Documento ID:', this.documentoId);
  }

  abrirModalNuevo() {
    this.editando = false;
    this.nuevoDetalle = { id: 0, nombre: '', descripcion: '', imagen: '', estado: true };
  }

  
  guardarDetalle() {
    if (this.editando) {
      const index = this.products.findIndex(d => d.id === this.nuevoDetalle.id);
      this.products[index] = { ...this.nuevoDetalle };
    } else {
      const nuevo = {
        ...this.nuevoDetalle,
        id: this.products.length + 1
      };
      this.products.push(nuevo);
    }

    this.nuevoDetalle = { id: 0, nombre: '', descripcion: '', imagen: '', estado: true };
    this.editando = false;
  }

  editarDetalle(detalle: Producto) {
    this.nuevoDetalle = { ...detalle };
    this.editando = true;
  }



}
