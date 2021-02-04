import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthentificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authenticationService.isAuthenticated()) {
      var token = AuthentificationService.getToken();

      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${AuthentificationService.getToken()}`
        }
      });

      if (token != null) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token)});
      }
    } else {
      console.log('No JWT Token!!! Normal only for initial login.');
    }

    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse && event.headers.get('X-Auth-Token')) {
              // console.log('refreshing token' + event.headers.get('X-Auth-Token'));
              AuthentificationService.setToken(event.headers.get('X-Auth-Token'));

          }
        }, error => {
          // http response status code
          console.log('----response----');
          console.error('error status: ' + error.status);
          console.error('error message: ' + error.message);
          console.error('error code: ' + error.error.code);
          console.log('--- end of response---');
          
          // 0 = AUTHENTICATION_ERROR (see ApiError.java)
          if (error.error.code === 0)
            this.authenticationService.logout();
        })
      );

  }
}

