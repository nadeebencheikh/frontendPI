import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {Product} from '../../Models/Product';
import {CookiesService} from "../../services/cookie/cookies.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Category} from "../../Models/Category";
import {CategoryService} from "../../services/Category/Category.service";
import { Router } from '@angular/router';
import {ImageService} from "../../services/Image/Image.service";
import {SubCategoryService} from "../../services/Category/SubCategory.service";
import {SubCategory} from "../../Models/SubCategory";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  jwt: string
  products : Product[] = [];
  categories : Category[] = [];
  searchTerm: string = "";
  constructor(private productService: ProductService,
              private CategoryService : CategoryService,
              private ImageService:ImageService,
              private cs : CookiesService,
              private router: Router,
              private SubCategoryService : SubCategoryService) {
  this.jwt = cs.getCookieJWT().toString()
  }
  GetAllProducts() {
    this.productService.GetAllProducts()
      .subscribe(
        (response: Product[]) => {
          for (let product of response) {
            this.ImageService.GetImageByIdProduct(product.idProduct)
              .subscribe((value: any) => {
                product.ProductImages = this.ImageService.createImage(value);
                if(product.status == 1){
                  this.products.push(product);
                }
              }
              );
          }
          console.log(this.products)

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
  }

  getAllCategories() {
    this.CategoryService.GetAllCategories()
      .subscribe((response: Category[]) => {
          this.categories = response;

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
  }

  ngOnInit(): void {
    this.GetAllProducts()
    this.getAllCategories()
  }

  GetProductsByCategory(category: any) {
    this.products = [];
    for(let subcategory of category.subcategories) {
      this.SubCategoryService.GetProductBySubCategroy(subcategory.idSubCategory).subscribe(
        (response: Product[]) => {
          for (let product of response) {
            this.ImageService.GetImageByIdProduct(product.idProduct).subscribe((value: any) => {
              product.ProductImages = this.ImageService.createImage(value);
              this.products.push(product);
            });
          }
          console.log(this.products);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    }
  }





  ShowProduct(Product: Product) {
    this.router.navigate(['/productdetail', Product.idProduct], { state: { data: Product } });
  }

  searchProducts() {
    // Filter products based on the search query
    if (this.searchTerm.length > 0) {
      this.products = this.products.filter((product) => {
        return product.title.toLowerCase().includes(this.searchTerm.toLowerCase())  ;

      });
    }
    console.log(this.searchTerm.toLowerCase())
  }
  UpdateFields() {

  }
}
