import { Component } from '@angular/core';
import { Producto } from '../../models/producto/producto';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-producto',
  imports: [CommonModule, RouterLink],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Productos {
  products: Producto[] = [
    {
      id: 1,
      name: 'Arándano',
      image: '../../../assets/img/arandano.png'
    },
    {
      id: 2,
      name: 'Palta',
      image: '../../../assets/img/palta.png'
    },
    {
      id: 3,
      name: 'Uva',
      image: '../../../assets/img/uva.png'
    }
  ];

}
