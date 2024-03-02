import * as bcrypt from 'bcryptjs';
import IUser, { IUserLogin } from '@interfaces/IUser';
import { IToken } from '@interfaces/IToken';
import { IUserModel } from '@interfaces/IUserModel';
import UserModel from '@model/User.model';
import JWT from '../utils/JWT';
import { ServiceResponse } from '@/interfaces/Response';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login({ email, password }: IUserLogin):
  Promise<ServiceResponse<IToken | null>> {
    const user = await this.userModel.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = JWT.sign({ email });
    return { status: 'SUCCESSFUL', data: token };
  }

  public async create(data: Omit<IUser, "id">):
  Promise<ServiceResponse<IUser>> {
    const [userByEmail, userByUsername] = await Promise.all([
      this.userModel.findByEmail(data.email),
      this.userModel.findByUsername(data.username),
    ]);

    if (userByEmail || userByUsername) {
      return { status: 'CONFLICT', data: { message: 'Username or e-mail already registered' } };
    }

    const passwordEncripted = bcrypt.hashSync(data.password, 10);
    const newUser = await this.userModel.create({ ...data, password: passwordEncripted });
    return { status: 'CREATED', data: newUser };
  }
};
