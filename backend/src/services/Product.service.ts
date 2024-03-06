import { IProduct, TProducts } from '@/interfaces/IProducts';
import { ServiceResponse } from '@/interfaces/Response';
import ProductModel from '@/model/Product.model';
import ProductOrganizer from '@/utils/ProductOrganizer';
import { IProductModel } from '@interfaces/IProductModel';

export default class ProductService {
  constructor(private productModel: IProductModel = new ProductModel()) {}

  public async create(
    data: TProducts
  ): Promise<ServiceResponse<IProduct | IProduct[]>> {
    try {
      const productOrganizer = new ProductOrganizer();
      const productOrganized = productOrganizer.organizeProduct(data);
      let product;
      if (Array.isArray(productOrganized)) {
        product = await this.productModel.createMany(productOrganized);
      } else {
        product = await this.productModel.create(productOrganized);
      }
      console.log(productOrganized);

      return { status: 'CREATED', data: product };
    } catch (error: unknown) {
      return { status: 'INVALID_DATA', data: { message: 'Invalid data' } };
    }
  }

  public async getProducts(): Promise<ServiceResponse<IProduct[]>> {
    const products = await this.productModel.findAll();
    return { status: 'SUCCESSFUL', data: products };
  }

  public async getProduct(id: number): Promise<ServiceResponse<IProduct>> {
    const product = await this.productModel.findById(id);
    if (product) return { status: 'SUCCESSFUL', data: product };
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  public async deleteProduct(id: string): Promise<ServiceResponse<IProduct>> {
    const products = await this.productModel.findById(Number(id));
    if (!products) {
      return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }
    await this.productModel.deleteProduct(Number(id));
    return { status: 'NO_CONTENT', data: products };
  }

  public async updateProduct(
    id: number,
    product: IProduct
  ): Promise<ServiceResponse<IProduct>> {
    const { id: _id, ...productWithoutId } = product;
    const [affectedCount] = await this.productModel.updateProduct(id, productWithoutId);
    if (affectedCount > 0) return { status: 'SUCCESSFUL', data: { id, ...productWithoutId} };
    return { status: 'INVALID_DATA', data: { message: 'Invalid data' } };
  }
}
