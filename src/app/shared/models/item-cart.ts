import { Product } from "./product";

export interface ItemCart {
    id: number;
    product: Product;
    quantity: number;
    price: number;
    picked: boolean;
    supermarketName: string;
}
