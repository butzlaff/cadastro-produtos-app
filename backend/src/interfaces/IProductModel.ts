import { IProduct } from './IProducts';

export interface IProductModel {
  create(product: IProduct): Promise<IProduct>;
  updateProduct(id: number, product: Omit<IProduct, 'id'>): Promise<[number]>;
  findById(id: number): Promise<IProduct | null>;
  createMany(product: IProduct[]): Promise<IProduct[]>;
  findAll(): Promise<IProduct[]>;
  deleteProduct(id: number): Promise<number>;
}
