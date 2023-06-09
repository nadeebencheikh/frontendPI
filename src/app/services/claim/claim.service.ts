import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  baseUrl="http://127.0.0.1:8085"
  constructor(private http:HttpClient) { }
  addclaim(data:any,token:any)
  {
    return this.http.post<any>(this.baseUrl+"/claim/add-claim",JSON.stringify(data),{
      headers:new HttpHeaders({
            'authorization' : 'Bearer '+token ,
            'Content-Type': 'application/json',
          })
    })
  }
  getclaim(token:any)
  {
    return this.http.get<any>(this.baseUrl+"/claim/retrieve-all-claims", {
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    })
  }
  updateClaim(data:any,token:any)
  {
      return this.http.put<any>(this.baseUrl+"/claim/update-claim",JSON.stringify(data),{
        headers:new HttpHeaders({
          'authorization' : 'Bearer '+token ,
          'Content-Type': 'application/json',
        }

        )
      })
    }
  sendmail(email:any,message:any,token:any){

    return this.http.post<any>(this.baseUrl+"/claim/sendmail/"+email,message, {
      headers:new HttpHeaders({
        'authorization' : 'Bearer '+token ,
        'Content-Type': 'application/json',
      }

      )
    })


  }
}
