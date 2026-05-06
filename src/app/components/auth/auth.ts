import { Component } from '@angular/core';
import { User } from '../../models/user/user';
import { SharingData } from '../../services/sharing-data.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  user: User;

  constructor(private sharingData: SharingData) {
    this.user = new User();
  }

  isPasswordFocused = false;

  toggleLock(state: boolean): void {
    this.isPasswordFocused = state;
  }

  onSubmit() {
    if (!this.user.username || !this.user.password) {
      Swal.fire('Error en la validación ', 'Username y password requerido!', 'error');
    } else {
      this.sharingData.handlerLoginEventEmitter.emit({
        username: this.user.username,
        password: this.user.password,
      });
      // console.log('holas +' + this.user.username + ' ' + this.user.password);
    }
  }

  onRegister(): void {
    console.log('Registro de nuevo usuario');
  }
  onGoogleLogin(): void {
    console.log('Iniciar sesión con Google');
    // Aquí puedes integrar el flujo de autenticación de Google, por ejemplo, usando Firebase Authentication.
  }
}
