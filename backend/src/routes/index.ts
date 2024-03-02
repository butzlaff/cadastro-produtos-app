import { Router } from 'express';
import productRouter from './product.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/user', userRouter);
router.use('/product', productRouter);

export default router;
