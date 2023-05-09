import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

import {Product} from "../../Models/Product";
import {User} from "../../Models/User";
import {Category} from "../../Models/Category";
import {HttpErrorResponse} from "@angular/common/http";
import {SubCategory} from "../../Models/SubCategory";
import {Image} from "../../Models/Image";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/product/product.service";
import {CookiesService} from "../../services/cookie/cookies.service";
import {SubCategoryService} from "../../services/Category/SubCategory.service";
import {ImageService} from "../../services/Image/Image.service";
import {CategoryService} from "../../services/Category/Category.service";

import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  products: Product[] = [];
  jwt!: string;
  currentProduct!: Product;
  categories: Category[] = [];
  SubCategories: SubCategory[] = [];
  currentCategory!: Category;
  filteredSubCategories: SubCategory[] = [];
  id!: number;
  user : User = {idUser: 1, name: '', products : [] , favorite: {idFavoris:1 ,Subcategories: []}};
 
 loggedin=false;
  constructor(private activatedRoute: ActivatedRoute, private _router: Router,
              private productService: ProductService,
              private formBuilder: FormBuilder,
              private SubCategoryService: SubCategoryService,
              private cs: CookiesService,
              private ImageService: ImageService,
              private CategoryService: CategoryService, private UserService: UserService){}
  public productToAdd: Product = {
    idProduct: 0,
    title: '',
    reference: '',
    description: '',
    createDateTime: new Date().toISOString(),
    status: 0,
    quantity: 0,
    user: this.user ,
    subcategory: null,
    ProductImages: [],
    commandes:[]
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

  getAllSubCategories() {
    this.SubCategoryService.GetAllSubCategories()
      .subscribe((response: SubCategory[]) => {
          this.SubCategories = response;
          console.log(this.SubCategories)
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
  }
  addProduct() {
    const product = this.prepareFormData(this.productToAdd)
    console.log(product)
    console.log(this.productToAdd)
    this.productService.addProduct(product)
      .subscribe((response: Product) => {

          setTimeout(function () {
            alert("Ajout Avec Succes")
            window.location.reload();
          }, 2000);

 

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllSubCategories();
    //window.location.reload();
    this.loggedin=this.UserService.isLoggedInUser();
    console.log(this.loggedin+"--------------");


        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );

  }

  prepareFormData(product: Product) {
    const formdata = new FormData();
    this.productToAdd.ProductImages.forEach(image => {
      formdata.append('image',
        image.file,
        image.file.name);
    });
    formdata.append(
      'product',
      new Blob([JSON.stringify(product)], {type: 'application/json'})
    )
    return formdata;
  }


  updateProduct() {

    // Filter subcategories based on the selected category
    this.filteredSubCategories = this.currentCategory.subcategories;
    console.log(this.currentCategory)
    // Set default value for currentProduct.subcategory
    if (this.filteredSubCategories.length > 0) {
      this.currentProduct.subcategory = this.filteredSubCategories[0];
    }
    console.log(this.filteredSubCategories)

  }
  onFileSelected(event: any) {
    if (event.target.files) {
      const files = event.target.files;
      for (let file of files) {
        const image: Image = {
          file: file,
          url: false
        }
        this.productToAdd.ProductImages.push(image);
      }
    }
  }
profile(){
  console.log("peeeeeeeeeee")
  this._router.navigate(['/profile']);

}
}
