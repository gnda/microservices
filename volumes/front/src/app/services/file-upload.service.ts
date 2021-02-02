import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = `${environment.api+'image'+'?API_KEY='+environment.api_key}`;

  constructor(private http: HttpClient) { }

  uploadImage(file: File):Observable<any>{
    let formData: any = new FormData();
    formData.append("image", file);

    return this.http.post(this.baseUrl, formData,{
      reportProgress: true,
      observe: 'events'
    })
  }

  deleteImage(image: Image): Observable<any>{
    const url = this.baseUrl+"&id="+image.id;
    return this.http.delete(url);
  }
}
