import { Product } from '../inventory/product';

export interface Cart {
    id: number,
    idUser: number,
    products: Product[]
}
