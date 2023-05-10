import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl="http://127.0.0.1:8080"
  constructor(private http:HttpClient) {
  }

  getPublicChats(token:any){
    return this.http.get<any>(this.baseUrl + "/getChats",{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }

  getPrivateChats(token:any,user:any){
    return this.http.get<any>(this.baseUrl + "/getPrivateChats/"+user,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }
}
