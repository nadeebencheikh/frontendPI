import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Category} from "../../Models/Category";
import {Product} from "../../Models/Product";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = "http://localhost:8085"

  constructor(private http: HttpClient) {
  }
  GetAllCategories(token : any) {
    return this.http.get<any>(this.baseUrl + `/api/Category/all_categories`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }
}

