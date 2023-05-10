import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Comment} from '../../Models/comment'
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  jwt="";
  token = new HttpHeaders()
.set('Content-Type', 'application/json; charset=utf-8')
.set('Accept', 'application/json')
.set('authorization','Bearer '+this.jwt)

    private baseURL = "http://localhost:8085/comment";

    constructor(private httpClient: HttpClient) { }
    auth(token2:string){
      this.jwt='Bearer '+token2;
      console.log(this.jwt);

    }


    createComment(comment:Comment, id:number,iduser:number): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}/add-comment/${id}/${iduser}`,comment, {
        headers:new HttpHeaders({ authorization : this.jwt})
      });
    }

    addSubComment(text: string, parentId: number,iduser:number): Observable<Comment> {
      const newComment: Comment = {
        text: text,
        date: new Date(),
        parent: { idComment: parentId },
        replies: [],
        showReplies: false
      };
      const apiUrlWithParentId = `${this.baseURL}/add-reply/${parentId}/${iduser}`;
      return this.httpClient.post<Comment>(apiUrlWithParentId, newComment,{
        headers:new HttpHeaders({ authorization : this.jwt})
      });
    }



    getCommentsByPost(id: number): Observable<Comment[]>{
      return this.httpClient.get<Comment[]>(`${this.baseURL}/retrieve-comments-by-post/${id}`, {
        headers:new HttpHeaders({ authorization : this.jwt})
      });
    }

    updateComment(comment:Comment, id:number): Observable<Object>{
      return this.httpClient.put(`${this.baseURL}/update-comment/${id}`, comment, {
        headers:new HttpHeaders({ authorization : this.jwt})
      });
    }

    deleteComment(id: number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/remove-comment/${id}`, {
        headers:new HttpHeaders({ authorization : this.jwt})
      });
    }
}
