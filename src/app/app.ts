import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('clientTask');
  private authService = inject(Auth);
  isLoggedIn = signal<boolean>(false);
  currentUser = signal<string | null>(null);
  userRole = signal<string | null>(null);

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn.set(!!user);
      this.currentUser.set(user?.name || null);
      this.userRole.set(user?.role || null);
    });
  }
}
