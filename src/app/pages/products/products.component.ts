import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {Product} from '../../Models/Product';
import {CookiesService} from "../../services/cookie/cookies.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Category} from "../../Models/Category";
import {CategoryService} from "../../services/Category/Category.service";
import { Router } from '@angular/router';
import {ImageService} from "../../services/Image/Image.service";

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
  constructor(private productService: ProductService,
              private CategoryService : CategoryService,
              private ImageService:ImageService,
              private cs : CookiesService,
              private router: Router) {
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
                this.products.push(product);
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

  GetProductsByCategory(idCategory: number) {

  }

  ShowProduct(Product: Product) {
    this.router.navigate(['/productdetail', Product.idProduct], { state: { data: Product } });
  }
}
