import {Product} from "./Product";
import {Favorite} from "./Favorite";

export class User{
  idUser!: number;
  name!: string;
  products!: Product[];
  favorite!: Favorite;
}
