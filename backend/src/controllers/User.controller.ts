import { Request, Response } from 'express';
import mapStatusHTTP from '@utils/mapStatusHTTP';
import UserService from '@services/User.service';
import { userSchema } from '@/interfaces/IUser';

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
    const { status, data } = await this.userService.create(result.data);
    return res.status(mapStatusHTTP(status)).json(data);
  };
}
