import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private baseUrl = 'http://192.168.30.94:8080/api/fichastecnicas';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any>(`${this.baseUrl}/listar_documento`);
  }

  // insertar(data: any) {
  //   return this.http.post(`${this.baseUrl}/insertar_documento`, data);
  // }
  insertar(data: FormData) {
    return this.http.post(`${this.baseUrl}/insertar_documento`, data);
  }

  actualizar(data: any) {
    return this.http.post(`${this.baseUrl}/actualizar_documento`, data);
  }
}
