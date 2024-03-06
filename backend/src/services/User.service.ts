import { ServiceResponse } from '@/interfaces/Response';
import IUser, { IUserLogin } from '@interfaces/IUser';
import { IUserModel } from '@interfaces/IUserModel';
import UserModel from '@model/User.model';
import * as bcrypt from 'bcryptjs';
import JWT from '../utils/JWT';

export interface ResponseLogin {
    email: string;
    token: string;
}

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async login({
    username,
    password,
  }: IUserLogin): Promise<ServiceResponse<ResponseLogin>> {
    const user = await this.userModel.findByUsername(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: 'INVALID_DATA', data: { message: "All fields are required"} };
    }
    const { email } = user;
    const token = JWT.sign({ email, username });
    const response = { email, token };
    return { status: 'SUCCESSFUL', data: response };
  }

  public async create(
    data: Omit<IUser, 'id'>
  ): Promise<ServiceResponse<IUser>> {
    const [userByEmail, userByUsername] = await Promise.all([
      this.userModel.findByEmail(data.email),
      this.userModel.findByUsername(data.username),
    ]);

    if (userByEmail || userByUsername) {
      return {
        status: 'CONFLICT',
        data: { message: 'Username or e-mail already registered' },
      };
    }

    const passwordEncripted = bcrypt.hashSync(data.password, 10);
    const newUser = await this.userModel.create({
      ...data,
      password: passwordEncripted,
    });
    return { status: 'CREATED', data: newUser };
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.findByEmail(email);
  }
}
