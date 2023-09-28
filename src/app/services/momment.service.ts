import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moments';
import { Resposta } from '../Resposta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/api/moments`;
  
  constructor(private http: HttpClient) { }

  getMoments(): Observable<Resposta<Moment[]>>{
    return this.http.get<Resposta<Moment[]>>(this.apiUrl)
  }//pegar os dados do sistema

  getMoment(id: number): Observable<Resposta<Moment>> {
    const url = `${this.apiUrl}/${id}`; // Use acento grave e corrija a sintaxe
    return this.http.get<Resposta<Moment>>(url);
  }

  createMoment(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData)
  }

  removeMoment(id: number){
    const url = `${this.apiUrl}/${id}`; // Use acento grave e corrija a sintaxe
    return this.http.delete(url);
  }
  updateMoment(id: number, formData:FormData): Observable<FormData>{
    const url = `${this.apiUrl}/${id}`
    return this.http.put<FormData>(url, formData)
  }
  // Adicione métodos para realizar solicitações HTTP, como get(), post(), etc.
}