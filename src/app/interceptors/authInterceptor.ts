import { HttpInterceptorFn } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { Auth } from "../services/auth";
import { isPlatformBrowser } from "@angular/common";

export const authinterceptor: HttpInterceptorFn = (req, next) => {
    const platformId = inject(PLATFORM_ID);
    const isBrowser = isPlatformBrowser(platformId);
    if (!isBrowser) {
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
}