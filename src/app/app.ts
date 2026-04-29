import { Component, signal } from '@angular/core';
import { Navbar } from './utils/navbar/navbar';
import { Footer } from './utils/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Sistema de Fichas Técnicas';
}
