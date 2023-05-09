import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookiesService } from '../cookie/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="http://127.0.0.1:8085"
  constructor(private http:HttpClient,private ngxCookieService: CookiesService) { }
  getusers(token:any)
  {


    return this.http.get<any>(this.baseUrl+"/user/retrieve-users",
        {
          headers:new HttpHeaders({ authorization : 'Bearer '+token })
        })
  }
  getroles(token:any)
  {


    return this.http.get<any>(this.baseUrl+"/role/retrieve-roles",
        {
          headers:new HttpHeaders({ authorization : 'Bearer '+token })
        })
  }
  updateuser(data:any, token:any )
  {
    return this.http.put<any>(this.baseUrl+"/user/update-user",JSON.stringify(data),{
      headers:new HttpHeaders({
        'authorization' : 'Bearer '+token ,
        'Content-Type': 'application/json',
      }

      )
    })
  }
  deleteuser(data:any, token:any )
  {


    return this.http.get<any>(this.baseUrl+"/user/deleteuser/"+data, {
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    })
  }

  getoneuser(token:any,id:any)
  {
    return this.http.get<any>(this.baseUrl+"/user/get-user/"+id,
        {
          headers:new HttpHeaders({ authorization : 'Bearer '+token })
        })
  }


  saveuser(data:any, token:any)
  {


    return this.http.post<any>(this.baseUrl+"/user/add-user-admin",JSON.stringify(data),
          {
            headers:new HttpHeaders({
              'authorization' : 'Bearer '+token ,
              'Content-Type': 'application/json',
            }

            )
          }
    )
  }
  save(data:any)
  {


    return this.http.post<any>(this.baseUrl+"/user/add-user",data
    )
  }


  isLoggedInAdmin() {
    return !!this.ngxCookieService.getCookieJWT()&&this.ngxCookieService.getCookieCostom('role') === 'admin';
  }
  isLoggedInUser() {
    return !!this.ngxCookieService.getCookieJWT()&&this.ngxCookieService.getCookieCostom('role') === 'user';
  }
  isLoggedInAss() {
    console.log("isass"+ !!this.ngxCookieService.getCookieJWT()&&this.ngxCookieService.getCookieCostom('role') === 'association')
    return !!this.ngxCookieService.getCookieJWT()&&this.ngxCookieService.getCookieCostom('role') === 'association';
  }
}
