import { ItemCart } from "./item-cart";

export interface ShoppingCart {
    id: number;
    name: string;
    items: Array<ItemCart>;
    country: string;
    createdAt: Date;
    finished: boolean;
}
