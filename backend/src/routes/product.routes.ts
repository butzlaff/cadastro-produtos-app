import { Request, Router, Response, NextFunction } from 'express';
import ProductController from '@/controllers/Product.controller';
import Validations from '@/middlewares/Validate';

const router = Router();

const productController = new ProductController();

router.post('/new',
    Validations.validateToken,
    (req: Request, res: Response) =>
    productController.create(req, res),
);

export default router;
