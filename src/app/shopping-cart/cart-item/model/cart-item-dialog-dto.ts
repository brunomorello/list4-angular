import { ItemCart } from "src/app/shared/models/item-cart";
import { ShoppingCart } from "src/app/shared/models/shopping-cart";

export interface CartItemDialogDto {
    shoppingList: ShoppingCart,
    item: ItemCart,
    action: string,
    checkoutItem: boolean
}
