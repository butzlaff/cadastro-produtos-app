import SequelizeUsers from '../database/models/User';
import IUser from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUsers;

  async create(user: Omit<IUser, "id">): Promise<IUser> {
    return await this.model.create({ ...user });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await this.model.findOne({ where: { username } });
  }
};
