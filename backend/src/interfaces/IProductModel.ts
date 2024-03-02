import { IProduct } from './IProducts';

export interface IProductModel {
  create(product: IProduct): Promise<IProduct>
  createMany(product: IProduct[]): Promise<IProduct[]>
  findAll(): Promise<IProduct[]>
}
