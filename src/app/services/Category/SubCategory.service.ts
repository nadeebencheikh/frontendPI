import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
//import {SubCategory} from "../../Models/SubCategory";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  baseUrl = "http://localhost:8085"

  constructor(private http: HttpClient) {
  }
  addSubCategory(SubCategory:any, token : any) {
    return this.http.post<any>(this.baseUrl + `/api/SubCategory/add`, SubCategory,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }
  updateSubCategory(SubCategory:any , token : any){
    return this.http.put<any>(this.baseUrl + `/api/SubCategory/update`, SubCategory,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }
  deleteSubCategory(SubCategoryId:any) {
   // return this.http.delete<SubCategory>(this.baseUrl + `/api/SubCategory/delete/${SubCategoryId}`);
  }
  addCategoryToProduct(productId:any, categoryId:any , token : any) {
    return this.http.get<any>(this.baseUrl + `/api/product/addSubCategoryToProduct/${productId}/${categoryId}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }
  GetProductBySubCategroy(categoryName:any, token : any) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_product_By_Subcategory/${categoryName}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }


  FindSubCategoryById(SubCategoryId: number,token : any) {
//    return this.http.get<SubCategory>(`${this.baseUrl}/api/SubCategory/get/${SubCategoryId}`);
  }


  GetAllSubCategories(token : any) {
    return this.http.get<any>(this.baseUrl + `/api/SubCategory/all_subcategories`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }

}
