import { UserModel, IUser } from "../models/user.model";

export interface IUserRepository {
    getUserByMobile(mobileNumber: string): Promise<IUser | null>;
    createUser(userData: Partial<IUser>): Promise<IUser>;
}

export class UserRepository implements IUserRepository {
    async getUserByMobile(mobileNumber: string): Promise<IUser | null> {
        return UserModel.findOne({ mobileNumber });
    }

    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const user = new UserModel(userData);
        return await user.save();
    }
}
