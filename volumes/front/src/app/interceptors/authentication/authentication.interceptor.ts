import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService, private router: Router) { }

  private addToken(req: HttpRequest<unknown>): HttpRequest<unknown> {
    return req.clone({ headers: req.headers
      .set('Authorization', `Bearer ${this.auth.getToken()}`)
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.auth.getToken();
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });

    return next.handle(req).pipe(
      // Catch the 401 and handle it by refreshing the token and restarting the chain
      // (where a new subscription to this.auth.getToken() will get the latest token).
      catchError((err: HttpErrorResponse) => {
        // If the request is unauthorized, try refreshing the token before restarting.
        if (err.status === 401) {
          //return concat(this.auth.refreshToken, restart); 
        } else if (err.status === 403) {
          this.router.navigate(["/auth/login"]);
        }

        return throwError(err);
      })
    );
  }
}