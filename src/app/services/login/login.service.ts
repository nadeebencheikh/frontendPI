import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl="http://127.0.0.1:8085"
  constructor(private http:HttpClient) {
  }

  login(data:any)
  {
    return this.http.post<any>(this.baseUrl+"/user/authentificate",JSON.stringify(data),{
      headers:new HttpHeaders().append('Content-type','application/json; charset=utf-8')
    })
  }
  resetemail(data:any)
  {
    return this.http.post<any>(this.baseUrl+"/forgot_password/"+data,{
      headers:new HttpHeaders().append('Content-type','application/json; charset=utf-8')
    })
  }
  postmotdepasse(token:any,motdepasse:any) {
    return this.http.post(this.baseUrl+"/change_password/"+token, motdepasse );
  }

}
