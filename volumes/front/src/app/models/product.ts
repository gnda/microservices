import { Category } from './category';
import { Image } from './image';

export interface Product {
  id: number,
  name: string,
  description: string,
  price: number,
  images: Image[],
  stock: number,
  category: Category
}