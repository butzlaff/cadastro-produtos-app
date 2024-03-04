import { IProduct, TProducts } from '@/interfaces/IProducts';
import { ServiceResponse } from '@/interfaces/Response';
import ProductModel from '@/model/Product.model';
import ProductOrganizer from '@/utils/ProductOrganizer';
import { IProductModel } from '@interfaces/IProductModel';

export default class ProductService {
  constructor(
    private productModel: IProductModel = new ProductModel(),
  ) { }

  public async create(data: TProducts):
  Promise<ServiceResponse<IProduct | IProduct[]>> {
    try {
      const productOrganizer = new ProductOrganizer();
      const productOrganized = productOrganizer.organizeProduct(data);

      let product;
      if (Array.isArray(productOrganized)) {
        product = await this.productModel.createMany(productOrganized);
      } else {
        product = await this.productModel.create(productOrganized);
      }

      return { status: 'CREATED', data: product };
    } catch (error: unknown) {
      return { status: 'INVALID_DATA', data: { message: "Invalid data"} };
    }
  };

  public async getProducts(): Promise<ServiceResponse<IProduct[]>> {
    const products = await this.productModel.findAll();
    return { status: 'SUCCESSFUL', data: products };
  }
};
