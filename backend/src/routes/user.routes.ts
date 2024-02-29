import { Request, Router, Response } from 'express';
import UserController from '@/controllers/User.controller';

const router = Router();

const userController = new UserController(); 

router.post('/register', (req: Request, res: Response) => res.send('User created'));
router.post('/login', (req: Request, res: Response) => userController.login);

export default router;
