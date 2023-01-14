import { Product } from "./product";
import { Supermarket } from "./supermarket";

export interface ItemCart {
    id: number;
    product: Product;
    quantity: number;
    price: number;
    picked: boolean;
    supermarketName: string;
}
