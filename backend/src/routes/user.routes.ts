import { Request, Response, Router } from 'express';
import UserController from '../controllers/User.controller';
import Validations from '../middlewares/Validate';

const router = Router();

const userController = new UserController();

router.post('/register', (req: Request, res: Response) =>
  userController.create(req, res)
);
router.post('/login', (req: Request, res: Response) =>
  userController.login(req, res)
);
router.get('/', Validations.validateToken, (req: Request, res: Response) =>
  userController.getUser(req, res)
);

export default router;
