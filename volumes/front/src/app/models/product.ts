import { Category } from './category';
import { Image } from "./image";

export interface Product {
  id: number,
  name: string,
  category: Category,
  description: string,
  price: number,
  stock: number,
  images: Image[],
}
