import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Event } from 'src/app/Models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  token2="";
  token = new HttpHeaders()
  .set('Content-Type', 'application/json; charset=utf-8')
  .set('Accept', 'application/json')
  .set('authorization',this.token2)
   
    private baseURL = "http://localhost:8085/event";
    
    constructor(private httpClient: HttpClient) { }

    auth(token:string){
      this.token2='Bearer '+token;
      console.log(this.token2);

    }
  
    getEvenementsList(): Observable<Event[]>{
      
      return this.httpClient.get<Event[]>(`${this.baseURL}/retrieve-all-events`, {
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }
  
    createEvenement(evenement: Event): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}/add-event`, evenement ,{
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }
  
    getEvenementById(id: number): Observable<Event>{
      return this.httpClient.get<Event>(`${this.baseURL}/retrieve-event/${id}`, {
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }
  
    updateEvenement( evenement: Event): Observable<Object>{
      return this.httpClient.put(`${this.baseURL}/update-event`, evenement, {
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }
  
    deleteEvenement(id: number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/remove-event/${id}`, {
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }
   /* participerEvenement(id1?: number, id2?: number): Observable<any>{
      console.log("participerEvenement - id1:", id1, "id2:", id2);
      return this.httpClient.post(`http://localhost:8085/eventparticipation/participer/${id1}/${id2}`, {headers:this.token});
    }  */

    participerEvenement(id1?: number, id2?: number): Observable<any> {
      console.log("participerEvenement - id1:", id1, "id2:", id2);
      return this.httpClient.post(`http://localhost:8085/eventparticipation/participer/${id1}/${id2}`, {}, {
        headers: this.token,
        responseType: 'blob'
      }).pipe(
        map((res: Blob) => {
          const url = window.URL.createObjectURL(res);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = 'qrcode.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
          return res;
        })
      );
    }
    
    annulerparticipationEvenement(id1?: number, id2?: number): Observable<any>{
      console.log("participerEvenement - id1:", id1, "id2:", id2);
      return this.httpClient.delete(`http://localhost:8085/eventparticipation/annulerparticipation/${id1}/${id2}`,{
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }

    check (id1?: number, id2?: number): Observable<number>{
      return this.httpClient.get<number>(`http://localhost:8085/eventparticipation/checkevents/${id1}/${id2}`, {
        headers:new HttpHeaders({ authorization : this.token2})
      });

    }
    
}
