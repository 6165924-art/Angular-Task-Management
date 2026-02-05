import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: '',
})
export class Logout implements OnInit {
  private router = inject(Router);
  private auth = inject(Auth);
  ngOnInit(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

