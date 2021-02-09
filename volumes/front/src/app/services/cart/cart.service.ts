import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../models/response';
import { Cart } from '../../models/cart/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = `${environment.api + 'cart/carts'}`;
  private apiKey = '?API_KEY='+environment.api_key;

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl);
  }

  addCart(cart: Cart): Observable<Response>{
    let params = new FormData();
    params.append('idUser', cart.idUser.toString());
    params.append('products',`${cart.products.toString()}`);

    return this.http.post<Response>(this.baseUrl, params);
  }

  editCart(cart: Cart): Observable<Response>{
    const url = this.baseUrl+this.constructURLParams(cart);
    return this.http.put<Response>(url, cart);
  }

  deleteCart(cart: Cart): Observable<Response>{
    const url = this.baseUrl+"&id="+cart.id;
    return this.http.delete<Response>(url);
  }

  constructURLParams = (object) => {
    let result = '';
    for (const property in object) {
        result += `&${property}=${object[property]}`;
    }
    return result;
  }
}
