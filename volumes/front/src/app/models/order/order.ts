import { User } from '../authentication/user';
import { Product } from '../inventory/product';

export interface Order {
    id: number,
    idUser: number,
    amount: number,
    createdAt: Date,
    products: Product[]
}
