import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  token = new HttpHeaders()
  .set('Content-Type', 'application/json; charset=utf-8')
  .set('Accept', 'application/json')
  .set('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzcyI6InNwcmluZyBiYWNrZW5kIiwiaWQiOjEsImV4cCI6MTY4MzYyMjYwMSwiaWF0IjoxNjgzNTkzODAxfQ.WrQv3fBeZCpGpfil8huFrY68j_-o3DS1l86yOFyTAgxMB4IT7ObNG9mYrZ2XmATyW6iDjr2Gs5JyVxR4rUxvcw')
    private baseURL = "http://localhost:8085/reaction";
  
    constructor(private httpClient: HttpClient) { }

    addReact(id:number,type:string): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}/add-reaction/1/${id}`, type , {headers:this.token});
    }

    deleteReact(id: number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/remove-reaction/1/${id}`, {headers:this.token});
      
    }
}
