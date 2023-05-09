import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Comment} from '../../Models/comment'
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  token = new HttpHeaders()
  .set('Content-Type', 'application/json; charset=utf-8')
  .set('Accept', 'application/json')
  .set('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzcyI6InNwcmluZyBiYWNrZW5kIiwiaWQiOjEsImV4cCI6MTY4MzUzNzc5MSwiaWF0IjoxNjgzNTA4OTkxfQ.gF4kYfan2A1hTk3RTUfBMlzo3q3iEMw927je4MLqAZCSl9Lko-1s8Fh0GcEA5PQhywAlCCL5rdS5BDoJXXRLEA')
   
    private baseURL = "http://localhost:8085/comment";
  
    constructor(private httpClient: HttpClient) { }
  
    
   
    createComment(comment:Comment, id:number): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}/add-comment/${id}`,comment, {headers:this.token});
    }

    addSubComment(text: string, parentId: number): Observable<Comment> {
      const newComment: Comment = {
        text: text,
        date: new Date(),
        parent: { idComment: parentId },
        replies: [],
        showReplies: false
      };
      const apiUrlWithParentId = `${this.baseURL}/add-reply/${parentId}`;
      return this.httpClient.post<Comment>(apiUrlWithParentId, newComment);
    }

    
  
    getCommentsByPost(id: number): Observable<Comment[]>{
      return this.httpClient.get<Comment[]>(`${this.baseURL}/retrieve-comments-by-post/${id}`, {headers:this.token});
    }
  
    updateComment(comment:Comment, id:number): Observable<Object>{
      return this.httpClient.put(`${this.baseURL}/update-comment/${id}`, comment, {headers:this.token});
    }
  
    deleteComment(id: number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/remove-comment/${id}`, {headers:this.token});
    }
}
