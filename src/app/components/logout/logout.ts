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
    this.auth.logout(); // טיפול לוגיקה בהתנתקות
    this.router.navigate(['/login']);
  }
}



// import { Component, inject, signal } from '@angular/core';
// import { Auth } from '../../services/auth';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-logout',
//   imports: [],
//   templateUrl: './logout.html',
//   styleUrl: './logout.css',
// })
// export class Logout {
//   private router = inject(Router); // למה הוא עושה שגיאה בגלל השורה הזו???
//   userBehaviorSubject: any;
// logout() {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     this.userBehaviorSubject.next(null);
//     this.router.navigate(['/login']);
//   }
// }
