import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documentos } from '../components/documentos/documentos';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  private apiUrl = 'http://000.0.0.0:8080/api/documentos'; // 🔥 TU API

  constructor(private http: HttpClient) {}

  listar(): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(this.apiUrl);
  }
}
