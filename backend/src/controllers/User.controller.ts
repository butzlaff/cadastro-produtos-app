import { Request, Response } from 'express';
import mapStatusHTTP from '@utils/mapStatusHTTP';
import UserService from '@services/User.service';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) { }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const token = await this.userService.login({ email, password });
    return res.status(mapStatusHTTP("SUCCESSFUL")).json(token);
  };
}
