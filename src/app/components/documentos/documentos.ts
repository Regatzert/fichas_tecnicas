import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { tipoDocumento } from '../../models/tipo-documento/tipo-documento';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-documentos',
  imports: [CommonModule, FormsModule],
  templateUrl: './documentos.html',
  styleUrl: './documentos.css',
})
export class Documentos implements OnInit {

  documentoId!: number;


  detalles: tipoDocumento[] = [
    {
        id: 1,
        descripcion: 'Manual',
        estado: true
    },
    {
        id: 2,
        descripcion: 'Produccion',
        estado: false
    },
  ];

  nuevoDetalle: tipoDocumento = {
    id: 0,
    descripcion: '',
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
    this.nuevoDetalle = { id: 0, descripcion: '', estado: true };
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

    this.nuevoDetalle = { id: 0, descripcion: '', estado: true };
    this.editando = false;
  }

  editarDetalle(detalle: tipoDocumento) {
    this.nuevoDetalle = { ...detalle };
    this.editando = true;
  }

  eliminarDetalle(id: number) {
    this.detalles = this.detalles.filter(d => d.id !== id);
  }

}

