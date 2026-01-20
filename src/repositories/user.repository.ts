import { UserModel, IUser } from "../models/user.model";

export interface IUserRepository {
  // Auth 
  getUserByMobile(mobileNumber: string): Promise<IUser | null>;

  // Common DB queries 
  createUser(userData: Partial<IUser>): Promise<IUser>;
  getUserById(id: string): Promise<IUser | null>;
  getAllUsers(): Promise<IUser[]>;
  updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
}

//
export class UserRepository implements IUserRepository {

  async getUserByMobile(mobileNumber: string): Promise<IUser | null> {
    return await UserModel.findOne({ mobileNumber });
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async getAllUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  async updateUser(
    id: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result ? true : false;
  }
}
