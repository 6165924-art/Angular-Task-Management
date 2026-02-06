import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: '',
})
export class Logout implements OnInit {
  private router = inject(Router);
  private auth = inject(Auth);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.auth.logout();
    this.toastr.success('התנתקת בהצלחה!', 'ביום ט');
    this.router.navigate(['/login']);
  }
}

