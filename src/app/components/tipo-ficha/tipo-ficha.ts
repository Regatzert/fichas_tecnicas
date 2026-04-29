import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tipoFicha } from '../../models/tipo-ficha/tipo-ficha';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-ficha',
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-ficha.html',
  styleUrl: './tipo-ficha.css',
})
export class TipoFicha  implements OnInit {

  documentoId!: number;

  detalles: tipoFicha[] = [
    {
        id: 1,
        producto: {} as any,
        descripcion: 'Manual',
        order: 1
    },
    {
        id: 2,
        producto: {} as any,
        descripcion: 'Produccion',
        order: 2
    },
  ];

  nuevoDetalle: tipoFicha = {
    id: 0,
    producto: {} as any,
    descripcion: 'Documento Internacional de Identidad',
    order: 2
  };

  editando: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.documentoId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Documento ID:', this.documentoId);
  }

  abrirModalNuevo() {
    this.editando = false;
    this.nuevoDetalle = { id: 0, producto: {} as any, descripcion: '', order: 1 };
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

    this.nuevoDetalle = { id: 0, producto: {} as any, descripcion: '', order: 1 };
    this.editando = false;
  }

  editarDetalle(detalle: tipoFicha) {
    this.nuevoDetalle = { ...detalle };
    this.editando = true;
  }

  eliminarDetalle(id: number) {
    this.detalles = this.detalles.filter(d => d.id !== id);
  }

}

