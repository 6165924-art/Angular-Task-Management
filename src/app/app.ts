import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { Auth } from './services/auth';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    ToastrModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('עוזר משימות');
  private authService = inject(Auth);
  private router = inject(Router);
  
  isLoggedIn = signal<boolean>(false);
  currentUser = signal<string | null>(null);
  userRole = signal<string | null>(null);
  sidenavOpen = signal<boolean>(false);

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn.set(!!user);
      this.currentUser.set(user?.name || null);
      this.userRole.set(user?.role || null);
    });
  }

  toggleSidenav() {
    this.sidenavOpen.set(!this.sidenavOpen());
  }

  closeSidenav() {
    this.sidenavOpen.set(false);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.closeSidenav();
  }
}
