import UserController from '@/controllers/User.controller';
import { Request, Response, Router } from 'express';

const router = Router();

const userController = new UserController(); 

router.post('/register', (req: Request, res: Response) => userController.create(req, res));
router.post('/login', (req: Request, res: Response) => userController.login(req, res));

export default router;
