import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../../Models/Product";
//import {Product} from "../../Models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:8085"

  constructor(private http: HttpClient) {
  }

  addProduct(product:any,token:any) {
    return this.http.post<any>(this.baseUrl + `/api/product/add/images`, product,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }
  updateProduct(product:any,token : any){
    return this.http.put<any>(this.baseUrl + `/api/product/update`, product,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }
  deleteProduct(productId:any) {
   // return this.http.delete<Product>(this.baseUrl + `/api/product/deleteProductById/${productId}`);
  }
  addCategoryToProduct(productId:any, categoryId:any , token:any) {
    return this.http.get<any>(this.baseUrl + `/api/product/addSubCategoryToProduct/${productId}/${categoryId}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }
  GetProductBySubCategroy(categoryName:any, token : any) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_product_By_Subcategory/${categoryName}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }
  GetProductByFavorite(UserId:any, token : any) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_recomandation/${UserId}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }
  GetAllProducts(token : any) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_all`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }
  FindProductById(productId: number,token: any) {
    return this.http.get<Product>(`${this.baseUrl}/api/product/get/${productId}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    });
  }




}
