import IUser from '@interfaces/IUser';
import SequelizeUsers from '@/database/models/User';
import { IUserModel } from '@interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUsers;

  async create(user: Omit<IUser, 'id'>): Promise<IUser> {
    return this.model.create({ ...user });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ where: { email } });
  }
};
