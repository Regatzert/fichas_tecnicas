import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FichaTecnicaService {

    private baseUrl = 'http://192.168.30.94:8080/api/fichastecnicas';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any>(`${this.baseUrl}/listar_tipo_ficha`);
  }

  insertar(data: any) {
    return this.http.post(`${this.baseUrl}/insertar_tipo_ficha`, data);
  }

  actualizar(data: any) {
    return this.http.post(`${this.baseUrl}/actualizar_tipo_ficha`, data);
  }
}

