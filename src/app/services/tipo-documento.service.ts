import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documentos } from '../components/documentos/documentos';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  private apiUrl = '192.168.30.94:8080/api/fichastecnicas/listar_tipo_documento'; // 🔥 TU API

  constructor(private http: HttpClient) {}

  listar(): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(this.apiUrl);
  }
}
