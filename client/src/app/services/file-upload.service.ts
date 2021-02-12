import { Injectable } from '@angular/core';
import { Articals } from '../../app/models/Artical';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  baseURL = "http://localhost:5000/api";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  
  getArticals() {
    return this.http.get(this.baseURL)
  }

 
  addUser(ImageDesc: string, Image: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("Image", Image);
    formData.append("ImageDesc", ImageDesc);

    return this.http.post<Articals>(`${this.baseURL}/add`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
  updateArticals(id, data): Observable<any> {
    let url = `${this.baseURL}/update/${id}`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
     
    )
  }
  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

