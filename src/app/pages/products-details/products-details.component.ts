import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Product} from "../../Models/Product";
import {User} from "../../Models/User";
import {ProductService} from "../../services/product/product.service";
import {ImageService} from "../../services/Image/Image.service";
import {HttpErrorResponse} from "@angular/common/http";
import { Router } from '@angular/router';
import {Commande} from "../../Models/Commande";
import {CommandeService} from "../../services/Commande/Commande.service";
import { CookiesService } from 'src/app/services/cookie/cookies.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  currentProduct!: Product;
  jwt : string;

  constructor(private imageService: ImageService,
              private ProductService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private CommandeService : CommandeService,
              private cs : CookiesService) {
                this.jwt = cs.getCookieJWT().toString()
  }

  public productId: any = 0;
  user : User = {idUser: 1, name: '', products : [] , favorite: {idFavoris:1 ,Subcategories: []}};
  FavoriteProducts : Product[] = [] ;
  SimilarProduct: boolean = true;

  commande : Commande = {
    idCommande: 0,
    date :new Date,
    quantity: 0,
    product: this.currentProduct,
    user: this.user

  }
  editOrder: boolean = false;
  ngOnInit(): void {
    this.ProductService.GetProductByFavorite(this.user.idUser,this.jwt).subscribe((response: Product[]) => {
        for (let product of response) {
          this.imageService.GetImageByIdProduct(product.idProduct,this.jwt)
            .subscribe((value: any) => {
                product.ProductImages = this.imageService.createImage(value);
                this.FavoriteProducts.push(product);
              }
            );
        }
        console.log(this.FavoriteProducts)

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('id');
      this.ProductService.FindProductById(this.productId,this.jwt).subscribe(
        (product: any) => {
          this.currentProduct = product;
          this.imageService.GetImageByIdProduct(product.idProduct,this.jwt).subscribe(
            (value: any) => {
              product.ProductImages = this.imageService.createImage(value);
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
          )
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    });
  }

  ShowProduct(Product: Product) {
    this.router.navigate(['/productdetail', Product.idProduct], { state: { data: Product } });
  }



  AddCommande(Product: Product) {
    this.commande.product = Product;
    console.log(this.commande)
    this.CommandeService.AddCommande(this.commande,this.jwt).subscribe((response: Commande) => {})
  }
}
