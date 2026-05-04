import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Auth } from './components/auth/auth';
import { Forbidden403 } from './components/forbidden403/forbidden403';
import { Productos } from './components/productos/producto';
import { ProductoList } from './components/producto-list/producto-list';
import { FichaTecnica } from './components/ficha-tecnica/ficha-tecnica';
import { Documentos } from './components/documentos/documentos';
import { TipoFicha } from './components/tipo-ficha/tipo-ficha';
import { TipoDocumento } from './components/tipo-documento/tipo-documento';

export const routes: Routes = [
    {path:'', redirectTo:'/inicio', pathMatch:'full'},
    {path:'inicio', component: Inicio},
    {path:'login', component: Auth},
    {path:'ficha_tecnica', component: FichaTecnica},
    {path:'documentos', component: Documentos},
    {path:'tipo_documentos', component: TipoDocumento},
    {path:'tipo_ficha', component: TipoFicha},
    {
    path: 'productos',
    children: [
      { path: '', component: Productos },           // listar
    //   { path: 'listar', component: ProductoList },           // listar
      { path: ':id/list', component: ProductoList },
    //   { path: ':id/detalle', component: ProductoDetalle } // detalle
        ]
    },

    {path:'forbidden', component: Forbidden403},
    {path:'**', redirectTo:'/inicio', pathMatch:'full'}
];
