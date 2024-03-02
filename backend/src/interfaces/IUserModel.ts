import IUser from './IUser';

export interface IUserModel {
  create(user: Omit<IUser, "id">): Promise<IUser>
  findByEmail(email: string): Promise<IUser | null>
  findByUsername(username: string): Promise<IUser | null>
}
