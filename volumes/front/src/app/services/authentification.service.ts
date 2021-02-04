import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Authentification } from '../models/authentification';
import { Response } from '../models/response';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Itoken} from '../entities/user/Itoken';
import {Idecodedtoken} from '../entities/user/Idecodedtoken';
import {Icredentials} from '../entities/user/Icredentials';

const LOGIN_URL = environment.loginUrl;

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
};

@Injectable()
export class AuthentificationService {
    private static tokenItemName = 'token';

    private static jwtHelperService: JwtHelperService = new JwtHelperService();
  
    private rootViewContainer: any;
  
    constructor(private http: HttpClient, private router: Router, public toastr: ToastrService) {
  
    }
  
    static setToken(token) {
      localStorage.setItem(AuthentificationService.tokenItemName, token);
    }
  
    static getToken() {
      return localStorage.getItem(AuthentificationService.tokenItemName);
    }
  
    static getTokenObject(): any {
      return AuthentificationService.jwtHelperService.decodeToken(AuthentificationService.getToken());
    }
  
    static removeToken() {
      localStorage.removeItem(AuthentificationService.tokenItemName);
    }
  
    /**
     * //Can't inject viewContainer into Authentication service so have to set it from Component Class
     * @param viewContainerRef
     */
    public setRootViewContainerRef(viewContainerRef) {
      this.rootViewContainer = viewContainerRef;
    }
  
    login(login: string, password: string) {
  
      const credentials: Icredentials = {};
      login = login;
      password = password;

      this.http.post(LOGIN_URL, credentials, httpOptions).subscribe((data: Itoken) => {
          localStorage.setItem('loginName', login);
  
          if (data) {
            // Store Current User in localStorage to workaround F5 issue
            AuthentificationService.setToken(data.token);
            this.router.navigate(['/welcome']);
          } else {
            console.error('No user data after successful login.');
          }
        },
        (err: HttpErrorResponse) => {
          AuthentificationService.removeToken();
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
          this.toastr.error('Login Error', 'Error');
        });
    }
  
    isAuthenticated() {
      return !!AuthentificationService.getToken();
    }
  
    /**
     * Cleanup localStorage and redirect to login page
     */
    logout() {
      AuthentificationService.removeToken();
      localStorage.removeItem('loginName');
      if (this.router.url != '/login')
        this.router.navigate(['/login']);
    }
}