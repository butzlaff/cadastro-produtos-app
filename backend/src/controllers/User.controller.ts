import { Request, Response } from 'express';
import { userSchema } from '../interfaces/IUser';
import UserService from '../services/User.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService: UserService = new UserService(),
  ) { }

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    const { status, data } = await this.userService.login({ username, password });
    if ('message' in data) {
      return res.status(400).json(data);
    }
    const { token } = data;
    return res.status(mapStatusHTTP(status)).json({ username, token });
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
