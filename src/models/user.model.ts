import mongoose, { Schema, Document } from "mongoose";
import { UserType } from "../types/user.type";

const userSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        mobileNumber: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

export interface IUser extends UserType, Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export const UserModel = mongoose.model<IUser>("User", userSchema);
