import { Request, Response } from 'express';
import mapStatusHTTP from '@utils/mapStatusHTTP';
import ProductService from '@/services/Product.service';
import ProductModel from '@/model/Product.model';

export default class ProductController {
  constructor(
    private productService: ProductService = new ProductService(),
  ) { }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { status, data } = await this.productService.create(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  };
}