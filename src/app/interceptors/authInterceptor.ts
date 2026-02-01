import { HttpInterceptorFn } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { Auth } from "../services/auth";
import { isPlatformBrowser } from "@angular/common";

export const authinterceptor: HttpInterceptorFn = (req, next) => {
    const platformId = inject(PLATFORM_ID);
    const isBrowser = isPlatformBrowser(platformId);
    console.log('isBrowser:', isBrowser);
    if (!isBrowser) {
        console.log('Not in browser platform, skipping interceptor logic.');
        return next(req);
    }


    const authService = inject(Auth);
    const token = authService.getToken();

    if (req.url.includes('/api/auth'))
        return next(req);

    if (token) {
        const cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(cloned);
    }

    return next(req);


//     export const authUnterceptor: HttpInterceptorFn = (req, next) => {
//     const platformId = inject(PLATFORM_ID);
//     const isBrowser = isPlatformBrowser(platformId);
//     if (!isBrowser) {
//         return next(req);
//     }

//     const authService = inject(Auth);
//     const token = authService.getToken();

//     // דלג על endpoints שלא צריכים token (login, register וכו')
//     if (req.url.includes('/api/auth')) {
//         return next(req);
//     }

//     // אם יש token תקין, הוסף אותו
//     if (token) {
//         const cloned = req.clone({
//             setHeaders: { Authorization: `Bearer ${token}` }
//         });
//         return next(cloned);
//     }

//     // אם אין token, עדיין שלח את הבקשה (אפילו בלי Authorization)
//     console.warn('No token found. Request will be sent without Authorization.');
//     return next(req);
// }
}