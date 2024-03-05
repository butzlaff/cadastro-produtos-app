import { userSchema } from '@/interfaces/IUser';
import UserService from '@services/User.service';
import mapStatusHTTP from '@utils/mapStatusHTTP';
import { Request, Response } from 'express';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) { }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const { status, data } = await this.userService.login({ email, password });
    return res.status(mapStatusHTTP(status)).json(data);
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({message: "All fields are required"});
    }
    const { status } = await this.userService.create(result.data);
    return res.status(mapStatusHTTP(status)).json(null);
  };
}
