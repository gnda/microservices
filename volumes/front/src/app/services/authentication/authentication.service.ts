import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router"
import { Response } from '../../models/response';
import { User } from '../../models/authentication/user';
import { tokenGetter } from 'src/app/app-jwt.module';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = `${environment.api.AUTH_ADDRESS}`;

  constructor(private http: HttpClient, private router: Router) {}

  login(): Observable<Response>{
    let response = this.http.get<Response>(this.baseUrl + "/login");
    return response;
  }

  logout(): Observable<Response>{
    let response = this.http.get<Response>(this.baseUrl + "/logout");
    return response;
  }

  getToken(): string {
    return tokenGetter("access_token");
  }

  verifyToken(): Observable<Response>{
    let response = this.http.get<Response>(this.baseUrl + "/verify");
    return response;
  }

  refreshToken(): Observable<Response>{
    let response;
    if (!tokenGetter("refresh_token")) {
      this.router.navigate(['/auth']);
    } else {
      response = this.http.get<Response>(this.baseUrl + "/token/refresh");
    }
    return response;
  }

  /*getProductImages(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl + "/images");
  }

  addProduct(product: Product): Observable<Response>{
    let params = new FormData();
    params.append('name', product.name);
    params.append('description',product.description);
    params.append('price',`${product.price}`);
    params.append('stock',`${product.stock}`);
    params.append('images',product.images.toString());

    return this.http.post<Response>(this.baseUrl, params);
  }

  editProduct(product: Product): Observable<Response>{
    const url = this.baseUrl+this.constructURLParams(product);
    return this.http.put<Response>(url, product);
  }

  deleteProduct(product: Product): Observable<Response>{
    const url = this.baseUrl+"&id="+product.id;
    return this.http.delete<Response>(url);
  }*/

  constructURLParams = (object) => {
    let result = '';
    for (const property in object) {
        result += `&${property}=${object[property]}`;
    }
    return result;
  }
}
