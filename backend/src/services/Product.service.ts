import { IProductModel } from '@interfaces/IProductModel';
import { ServiceResponse } from '@/interfaces/Response';
import ProductModel from '@/model/Product.model';
import { IProduct, IProductData, IProductDetails } from '@/interfaces/IProducts';
import ProductOrganizer from '@/utils/ProductOrganizer';

export default class ProductService {
  constructor(
    private productModel: IProductModel = new ProductModel(),
  ) { }

  public async create(data: IProduct | IProductData[] | IProductDetails):
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
};
