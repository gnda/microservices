import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { concat, map, concatMap, catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }

  private addToken(req: HttpRequest<unknown>): HttpRequest<unknown> {
    return req.clone({ headers: req.headers
      .set('Authorization', `Bearer ${this.auth.getToken()}`)});
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = this.auth.getToken();

    const obs = of(token);

    return obs.pipe(
      // Get the latest token from the auth service.
      map(token => req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })),
      // Execute the request on the server.
      concatMap(authReq => next.handle(authReq)),
      // Catch the 401 and handle it by refreshing the token and restarting the chain
      // (where a new subscription to this.auth.getToken() will get the latest token).
      catchError((err, restart) => {
        // If the request is unauthorized, try refreshing the token before restarting.
        if (err instanceof HttpErrorResponse && err.status === 401) { 
          return concat(this.auth.refreshToken, restart); 
        } throw err; 
      })
    );
  }
}