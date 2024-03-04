import ProductController from '@/controllers/Product.controller';
import Validations from '@/middlewares/Validate';
import { Request, Response, Router } from 'express';

const router = Router();

const productController = new ProductController();

router.post('/new',
    Validations.validateToken,
    (req: Request, res: Response) =>
    productController.create(req, res),
);

router.get('/',
    (req: Request, res: Response) =>
    productController.getProducts(req, res),
);

export default router;
