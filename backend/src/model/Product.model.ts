import SequelizeProduct from '@/database/models/Product';
import { IProductModel } from '@interfaces/IProductModel';
import { IProduct } from '@interfaces/IProducts';

export default class ProductModel implements IProductModel {
  private model = SequelizeProduct;

  async create(product: Omit<IProduct, "id">): Promise<IProduct> {
    return await this.model.create(product);
  }

  async createMany(product: IProduct[]): Promise<IProduct[]> {
    return await this.model.bulkCreate(product);
  }

  async findAll(): Promise<IProduct[]> {
    return await this.model.findAll({
      order: ["id"]
    });
  };

  async findById(id: number): Promise<IProduct | null> {
    return await this.model.findOne({
      where: {
        id
      }
    });
  }

  async deleteProduct(id: number) : Promise<number> {
    return await this.model.destroy({
      where: {
        id
      }
    });
  };

  async updateProduct(id: number, product: Omit<IProduct, 'id'>): Promise<[number]> {
    return await this.model.update(product, {
      where: {
        id,
      }
    })
  };
};