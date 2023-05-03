import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
//import {SubCategory} from "../../Models/SubCategory";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  baseUrl = "http://localhost:8085"

  constructor(private http: HttpClient) {
  }
  addSubCategory(SubCategory:any) {
    return this.http.post<any>(this.baseUrl + `/api/SubCategory/add`, SubCategory);
  }
  updateSubCategory(SubCategory:any){
    return this.http.put<any>(this.baseUrl + `/api/SubCategory/update`, SubCategory);
  }
  deleteSubCategory(SubCategoryId:any) {
   // return this.http.delete<SubCategory>(this.baseUrl + `/api/SubCategory/delete/${SubCategoryId}`);
  }
  addCategoryToProduct(productId:any, categoryId:any) {
    return this.http.get<any>(this.baseUrl + `/api/product/addSubCategoryToProduct/${productId}/${categoryId}`);
  }
  GetProductBySubCategroy(categoryName:any) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_product_By_Subcategory/${categoryName}`);
  }


  FindSubCategoryById(SubCategoryId: number) {
//    return this.http.get<SubCategory>(`${this.baseUrl}/api/SubCategory/get/${SubCategoryId}`);
  }


  GetAllSubCategories() {
    return this.http.get<any>(this.baseUrl + `/api/SubCategory/all_subcategories`);
  }

}
