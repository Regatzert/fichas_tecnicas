import { Component, Input } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private authService: Auth,
    private router: Router
  ){}

  @Input() users: User[] = [];

  @Input() paginator = {}

  get login() {
    return this.authService.user;
  }

  get admin() {
    return this.authService.isAdmin();
  }

  handlerLogout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
