import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../Models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  jwt="";
  token = new HttpHeaders()
.set('Content-Type', 'application/json; charset=utf-8')
.set('Accept', 'application/json')
.set('authorization','Bearer '+this.jwt)
 

tokenn = new HttpHeaders()
.set('authorization',this.jwt)
 
  private baseURL = "http://localhost:8085/post";

  constructor(private httpClient: HttpClient) { }
  auth(token2:string){
    this.jwt='Bearer '+token2;
    console.log(this.jwt);

  }
  getPostsList(): Observable<Post[]>{
    
    return this.httpClient.get<Post[]>(`${this.baseURL}/retrieve-all-posts`);
  }

  createPost(post: any,id :number): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add/image/${id}`, post , {
      headers:new HttpHeaders({ authorization : this.jwt})
    });
  }

  getPostById(id: any): Observable<Post>{
    return this.httpClient.get<Post>(`${this.baseURL}/retrieve-post/${id}`, {headers:this.token});
  }

  updatePost( post:Post): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/update-post`, post, {headers:this.token});
  }

  deletePost(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-post/${id}`, {headers:this.token});
    
  }
}
