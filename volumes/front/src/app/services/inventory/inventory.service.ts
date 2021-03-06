import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Response } from '../../models/response';
import { Product } from '../../models/inventory/product';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = `${environment.api.INVENTORY_ADDRESS + '/api/products'}`;

  constructor(private httpAnon: HttpClient,
              private http: HttpClient,
              private handler: HttpBackend) {
    this.httpAnon = new HttpClient(handler);
  }

  getProducts(): Observable<Response>{
    let response = this.http.get<Response>(this.baseUrl);
    return response;
  }

  getProductImages(): Observable<Response>{
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
  }

  constructURLParams = (object) => {
    let result = '';
    for (const property in object) {
        result += `&${property}=${object[property]}`;
    }
    return result;
  }

}
