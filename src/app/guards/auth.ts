import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  const token = auth.getToken();

  if (token) return true;
  // return router.createUrlTree(['/login']);
  return router.navigate(['/login']);
};

export const loginGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const token = auth.getToken();

  // אם המשתמש כבר מחובר, העבר אותו ל-tasks
  if (!token)   return true; // בואו בעדינות ללוגין

    return router.navigate(['/tasks']);
};


// // auth.guard.ts
// import { Injectable } from '@angular/core';
// import { Router, CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { Auth } from '../services/auth';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(Auth);
//   const router = inject(Router);

//   if (authService.getToken()) {
//     return true; // הפעולה מותרת
//   }

//   router.navigate(['/login']);
//   return false;
// };

// export const loginGuard: CanActivateFn = (route, state) => {
//   const authService = inject(Auth);
//   const router = inject(Router);

//   // אם המשתמש כבר מחובר, העבר אותו ל-tasks
//   if (authService.getToken()) {
//     router.navigate(['/task']);
//     return false;
//   }

//   return true; // בואו בעדינות ללוגין
// };