import ProductService from '@/services/Product.service';
import mapStatusHTTP from '@utils/mapStatusHTTP';
import { Request, Response } from 'express';

export default class ProductController {
  constructor(
    private productService: ProductService = new ProductService(),
  ) { }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { status, data } = await this.productService.create(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public getProducts = async (req: Request, res: Response): Promise<Response> => {
    const { status, data } = await this.productService.getProducts();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}