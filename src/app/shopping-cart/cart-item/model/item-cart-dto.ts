import { Product } from "src/app/shared/models/product";

export interface ItemCartDto {
    id: number;
    product: Product;
    quantity: number;
    price: number;
    picked: boolean;
    supermarketName: string;
}
