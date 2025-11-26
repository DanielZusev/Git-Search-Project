import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
  isLoggedIn$: Observable<boolean>

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$
  }

  logout() {
    this.authService.logout()
  }
}
