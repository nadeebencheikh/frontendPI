import {Product} from "./Product";
import {User} from "./User";

export class Commande {
  idCommande!: number;
  date!: Date;
  quantity!: number;
  product!:Product;
  user!: User;

}
