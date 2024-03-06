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
    Validations.validateToken,
    (req: Request, res: Response) =>
    productController.getProducts(req, res),
);

router.delete('/:id',
    (req: Request, res: Response) =>
    productController.deleteProduct(req, res),
);

router.put('/:id',
    (req: Request, res: Response) =>
    productController.updateProduct(req, res),
);

export default router;
