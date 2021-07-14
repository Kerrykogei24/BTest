import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';


@Injectable({ providedIn: 'root' })

export class ApiAuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const _AUTHTOKEN = this.authService.getCurrentUser() ? `Bearer ${(this.authService.getCurrentUser() || {}).authToken}` : null;
        console.log(_AUTHTOKEN);
        
        const reqOptions = req.clone({
            headers: req.headers.set('Authorization', _AUTHTOKEN ? _AUTHTOKEN : '')
        });
        return next.handle(reqOptions);
    }

}