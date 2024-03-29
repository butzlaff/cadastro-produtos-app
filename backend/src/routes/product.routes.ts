import { Request, Response, Router } from 'express';
import ProductController from '../controllers/Product.controller';
import Validations from '../middlewares/Validate';

const router = Router();

const productController = new ProductController();

router.post('/new', Validations.validateToken, (req: Request, res: Response) =>
  productController.create(req, res)
);

router.get('/', Validations.validateToken, (req: Request, res: Response) =>
  productController.getProducts(req, res)
);

router.get('/:id', Validations.validateToken, (req: Request, res: Response) =>
  productController.getProduct(req, res)
);

router.delete(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => productController.deleteProduct(req, res)
);

router.put('/:id', Validations.validateToken, (req: Request, res: Response) =>
  productController.updateProduct(req, res)
);

export default router;
