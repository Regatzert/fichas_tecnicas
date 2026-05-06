import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { tipoDocumento } from '../../models/tipo-documento/tipo-documento';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { TipoDocumentoService } from '../../services/tipo-documento.service';

@Component({
  selector: 'app-tipo-documento',
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-documento.html',
  styleUrl: './tipo-documento.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TipoDocumento implements OnInit {
  estadoFiltro: number = 1; //  1 = activos, 0 = inactivos
  detallesOriginal: tipoDocumento[] = [];

  detalles: tipoDocumento[] = [];

  nuevoDetalle: tipoDocumento = {
    id_tipo_documento: 0,
    nombre: '',
    descripcion: '',
    estado: 1,
  };

  editando: boolean = false;

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarDocumentos();
  }

  cargarDocumentos() {
    this.tipoDocumentoService.listar().subscribe({
      next: (resp: any) => {
        this.detallesOriginal = resp.data;
        this.filtrar();

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar documentos', err.error);
      },
    });
  }

  abrirModalNuevo() {
    this.editando = false;
    this.nuevoDetalle = { id_tipo_documento: 0, nombre: '', descripcion: '', estado: 1 };
  }

  guardarDetalle() {
    const payload = {
      ...this.nuevoDetalle,
      estado: this.nuevoDetalle.estado ? 1 : 0, // 🔥 FIX
      usuario: 'admin', // 🔥 luego lo sacas del login
    };

    if (this.editando) {
      this.tipoDocumentoService.actualizar(payload).subscribe((resp: any) => {
        // console.log('RESPUESTA UPDATE:', resp);
        this.cargarDocumentos();
      });
    } else {
      this.tipoDocumentoService.insertar(payload).subscribe((resp: any) => {
        // console.log('RESPUESTA UPDATE:', resp);
        this.cargarDocumentos();
      });
    }

    this.editando = false;
  }

  editarDetalle(detalle: tipoDocumento) {
    this.nuevoDetalle = { ...detalle };
    // console.log('Detalle a editar:', this.nuevoDetalle);
    this.editando = true;
  }

  filtrar() {
    if (this.estadoFiltro === -1) {
      this.detalles = [...this.detallesOriginal];
    } else {
      this.detalles = this.detallesOriginal.filter((x) => x.estado == this.estadoFiltro);
    }
  }
}
