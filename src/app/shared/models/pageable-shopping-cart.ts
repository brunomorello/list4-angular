import { ShoppingCart } from "./shopping-cart";

export interface PageableShoppintCart {
    content: Array<ShoppingCart>;
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    sort: PageableSort;
    numberOfElements: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: PageableSort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
}

export interface PageableSort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
}