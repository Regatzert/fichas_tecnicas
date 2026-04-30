import { Component, OnInit } from '@angular/core';
import { tipoDocumento } from '../../models/tipo-documento/tipo-documento';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TipoDocumentoService } from '../../services/tipo-documento.service';

@Component({
  selector: 'app-tipo-documento',
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-documento.html',
  styleUrl: './tipo-documento.css',
})
export class TipoDocumento implements OnInit {

  documentoId!: number;

  detalles: TipoDocumento[] = [];

  // detalles: tipoDocumento[] = [
  //   {
  //       id: 1,
  //       nombre: 'Manual',
  //       descripcion: 'Manual  de Usuario',
  //       estado: true
  //   },
  //   {
  //       id: 2,
  //       nombre: 'Producción',
  //       descripcion: 'Documento de Producción',
  //       estado: false
  //   },
  // ];

  nuevoDetalle: tipoDocumento = {
    id: 0,
    nombre: '',
    descripcion: '',
    estado: true
  };

  editando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private documentoService: TipoDocumentoService
  ) {}

  ngOnInit(): void {
    this.documentoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDocumentos();
  }

   cargarDocumentos() {
    this.documentoService.listar().subscribe({
      next: (data) => {
        this.detalles = data;
        console.log('Datos API:', data);
      },
      error: (err) => {
        console.error('Error al cargar documentos', err);
      }
    });
  }

  abrirModalNuevo() {
    this.editando = false;
    this.nuevoDetalle = { id: 0, nombre: '', descripcion: '', estado: true };
  }

  guardarDetalle() {
    // ⚠️ por ahora sigue local (luego lo conectamos a backend)
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

  editarDetalle(detalle: TipoDocumento) {
    this.nuevoDetalle = { ...detalle };
    this.editando = true;
  }

  eliminarDetalle(id: number) {
    this.detalles = this.detalles.filter(d => d.id !== id);
  }

}


