import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../Models/Product";
import {ModalDirective} from "ngx-bootstrap/modal";
import {Category} from "../Models/Category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubCategory} from "../Models/SubCategory";
import {User} from "../Models/User";
import {Image} from "../Models/Image";
import {Router} from "@angular/router";
import {ProductService} from "../services/product/product.service";
import { CookiesService } from 'src/app/services/cookie/cookies.service';
import {ImageService} from "../services/Image/Image.service";
import {CategoryService} from "../services/Category/Category.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SubCategoryService} from "../services/Category/SubCategory.service";


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  products: Product[] = [];
  jwt!: string;
  today!: string;
  currentProduct!: Product;
  categories: Category[] = [];
  SubCategories: SubCategory[] = [];
  currentCategory!: Category;
  productForm!: FormGroup;
  filteredSubCategories: SubCategory[] = [];
  id!: number;
  user : User = {idUser: 1, name: '', products : [] , favorite: {idFavoris:1 ,Subcategories: []}};

  constructor(private R: Router,
              private productService: ProductService,
              private formBuilder: FormBuilder,
              private SubCategoryService: SubCategoryService,
              private cs: CookiesService,
              private ImageService: ImageService,
              private CategoryService: CategoryService,


  ){}

  public productToAdd: Product = {
    idProduct: 0,
    title: '',
    reference: '',
    description: '',
    createDateTime: new Date().toISOString(),
    status: 1,
    quantity: 0,
    user: this.user ,
    subcategory: null,
    ProductImages: [],
    commandes:[]
  }



  ngOnInit(): void {

    this.getAllCategories();
    this.getAllSubCategories();

  }



  getAllCategories() {
    this.CategoryService.GetAllCategories(this.jwt)
      .subscribe((response: Category[]) => {
          this.categories = response;

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });


  }

  getAllSubCategories() {
    this.SubCategoryService.GetAllSubCategories(this.jwt)
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
    this.productService.addProduct(product,this.jwt)
      .subscribe((response: Product) => {

          setTimeout(function () {
            alert("Ajout Avec Succes")
            window.location.reload();
          }, 2000);

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

}



