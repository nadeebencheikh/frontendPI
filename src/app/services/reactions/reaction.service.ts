import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  jwt="";
  token = new HttpHeaders()
  .set('Content-Type', 'application/json; charset=utf-8')
  .set('Accept', 'application/json')
  .set('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzcyI6InNwcmluZyBiYWNrZW5kIiwiaWQiOjEsImV4cCI6MTY4MzYyMjYwMSwiaWF0IjoxNjgzNTkzODAxfQ.WrQv3fBeZCpGpfil8huFrY68j_-o3DS1l86yOFyTAgxMB4IT7ObNG9mYrZ2XmATyW6iDjr2Gs5JyVxR4rUxvcw')
    private baseURL = "http://localhost:8085/reaction";

    constructor(private httpClient: HttpClient) { }
    auth(token2:string){
      this.jwt='Bearer '+token2;
      console.log(this.jwt);

    }
    addReact(id:number,type:string, idu:number): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}/add-reaction/${idu}/${id}`, type ,{
        headers:new HttpHeaders({ authorization : this.jwt})
      });
    }

    deleteReact(id: number, idu:number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/remove-reaction/${idu}/${id}`, {
        headers:new HttpHeaders({ authorization : this.jwt})
      });

    }
}
