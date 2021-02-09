import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../models/response';
import { Order } from '../../models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = `${environment.api + 'order/orders'}`;
  private apiKey = '?API_KEY='+environment.api_key;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Response>{
    return this.http.get<Response>(this.baseUrl);
  }

  addOrder(order: Order): Observable<Response>{
    let params = new FormData();
    params.append('idUser', order.idUser.toString());
    params.append('amount',order.amount.toString());
    params.append('createdAt',`${order.createdAt}`);
    params.append('products',`${order.products.toString()}`);

    return this.http.post<Response>(this.baseUrl, params);
  }

  editOrder(order: Order): Observable<Response>{
    const url = this.baseUrl+this.constructURLParams(order);
    return this.http.put<Response>(url, order);
  }

  deleteOrder(order: Order): Observable<Response>{
    const url = this.baseUrl+"&id="+order.id;
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
