import { Request, Response } from 'express';
import ProductService from '../services/Product.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class ProductController {
  constructor(private productService: ProductService = new ProductService()) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const product = req.body;
    const { status, data } = await this.productService.create(product);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public getProducts = async (
    _req: Request,
    res: Response
  ): Promise<Response> => {
    const { status, data } = await this.productService.getProducts();
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public getProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;
    const { status, data } = await this.productService.getProduct(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public deleteProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;
    const { status, data } = await this.productService.deleteProduct(id);
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public updateProduct = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;

    const { id: _id, ...product } = req.body;

    const { status, data } = await this.productService.updateProduct(
      Number(id),
      product
    );
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
