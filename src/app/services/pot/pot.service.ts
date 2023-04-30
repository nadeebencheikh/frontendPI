import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PotService {
  baseUrl="http://127.0.0.1:8085"
  constructor(private http:HttpClient) { }
  getpot(token:any)
  {


    return this.http.get<any>(this.baseUrl+"/pot/retrieve-all-pots",
        {
          headers:new HttpHeaders({ authorization : 'Bearer '+token })
        })
  }

  addpot(data:any, token:any)
  {

    return this.http.post<any>(this.baseUrl+"/pot/add/image",data,
          {
            headers:new HttpHeaders({
              'authorization' : 'Bearer '+token

            }

            )
          }
    )
  }
  deletepot(data:any, token:any )
  {


    return this.http.get<any>(this.baseUrl+"/pot/deletewithstate/"+data, {
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    })
  }
  updatept(data:any, token:any )
  {
    return this.http.put<any>(this.baseUrl+"/pot/update-pot",JSON.stringify(data),{
      headers:new HttpHeaders({
        'authorization' : 'Bearer '+token ,
        'Content-Type': 'application/json',
      }

      )
    })
  }

}
