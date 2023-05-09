import {Image} from "./Image";
import {SubCategory} from "./SubCategory";
import {User} from "./User";
import {Commande} from "./Commande";
export class Product{
  idProduct!: number;
  createDateTime!: string;
  description!: string;
  quantity!: number;
  reference!: string;
  status!: number;
  title!: string;
  subcategory!: SubCategory | null;
  user!: User ;
  ProductImages!: Image[];
  commandes!:Commande[];

}
