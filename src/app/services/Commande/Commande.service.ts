import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Commande} from "../../Models/Commande";
//import {SubCategory} from "../../Models/SubCategory";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  baseUrl = "http://localhost:8085"

  constructor(private http: HttpClient) {
  }

  AddCommande(Commande: any) {
    return this.http.post<any>(this.baseUrl + `/api/Commande/add`, Commande);
  }
}
