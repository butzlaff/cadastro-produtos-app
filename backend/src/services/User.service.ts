import * as bcrypt from 'bcryptjs';
import IUser, { IUserLogin } from '@interfaces/IUser';
import { IToken } from '@interfaces/IToken';
import { IUserModel } from '@interfaces/IUserModel';
import UserModel from '@model/User.model';
import JWT from '../utils/JWT';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login({ email, password }: IUserLogin):
  Promise<string | null> {
    const user = await this.userModel.findByEmail(email);

    // if (!user || !bcrypt.compareSync(password, user.password)) {
    //   return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    // }

    const token = JWT.sign({ email });
    return token;
  }
}
