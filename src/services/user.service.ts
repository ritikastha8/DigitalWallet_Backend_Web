// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { UserRepository } from "../repositories/user.repository";
// import { HttpError } from "../errors/http-error";
// import { JWT_SECRET } from "../config";
// import { CreateUserDTO } from "../dtos/user.dto";

// let userRepository = new UserRepository();

// export class UserService {
//     async createUser(data: CreateUserDTO) {
//         const exists = await userRepository.getUserByMobile(data.mobileNumber);
//         if (exists) throw new HttpError(409, "Mobile number already registered");

//         const hashedPassword = await bcrypt.hash(data.password, 10);
//         data.password = hashedPassword;

//         return userRepository.createUser(data);
//     }

//     async loginUser(data: any) {
//         const user = await userRepository.getUserByMobile(data.mobileNumber);
//         if (!user) throw new HttpError(404, "User not found");

//         const validPassword = await bcrypt.compare(data.password, user.password);
//         if (!validPassword) throw new HttpError(401, "Invalid credentials");

//         const payload = { id: user._id, mobileNumber: user.mobileNumber, role: user.role };
//         const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });

//         const userObj = user.toObject();
//         delete userObj.password;

//         return { token, user: userObj };
//     }
// }



import { CreateUserDTO, LoginUserDTO } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";
import bcryptjs from "bcryptjs";
import { HttpError } from "../errors/http-error";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

let userRepository = new UserRepository();

export class UserService {
    // Register a new user
    async createUser(data: CreateUserDTO) {
        // Check if mobile number already exists
        const mobileCheck = await userRepository.getUserByMobile(data.mobileNumber);
        if (mobileCheck) {
            throw new HttpError(403, "Mobile number already in use");
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(data.password, 10); // 10 = salt rounds
        data.password = hashedPassword;

        // Create user
        const newUser = await userRepository.createUser(data);
        return newUser;
    }

    // Login user
    async loginUser(data: LoginUserDTO) {
        // Find user by mobile number
        const user = await userRepository.getUserByMobile(data.mobileNumber);
        if (!user) {
            throw new HttpError(404, "User not found");
        }

        // Compare password
        const validPassword = await bcryptjs.compare(data.password, user.password);
        if (!validPassword) {
            throw new HttpError(401, "Invalid credentials");
        }

        // Generate JWT token
        const payload = {
            id: user._id,
            mobileNumber: user.mobileNumber,
            name:user.name,
            role: user.role
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" }); // 30 days

        return { token, user };
    }
}
