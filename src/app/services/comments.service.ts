import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http'
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Comments } from '../Comments';
import { Resposta } from '../Resposta';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseApiurl = environment.baseApiUrl
  private apiUrl = `${this.baseApiurl}/api/moments`
  constructor(private http: HttpClient,
    ) { }

    createComment(data: Comments): Observable<Resposta<Comments>>{
      const url = `${this.apiUrl}/${data.momentId}/comments`;
      console.log('URL da solicitação:', url); // Adicione esta linha para depurar a URL
      return this.http.post<Resposta<Comments>>(url, data);
    }
}

