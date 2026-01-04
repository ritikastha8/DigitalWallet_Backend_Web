import { Request, Response } from "express";
import { CreateUserDTO, LoginUserDTO } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { HttpError } from "../errors/http-error";
import z from "zod";

const userService = new UserService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const parsed = CreateUserDTO.safeParse(req.body);
            if (!parsed.success) return res.status(400).json({ success: false, message: z.prettifyError(parsed.error) });


            const newUser = await userService.createUser(parsed.data);
            return res.status(201).json({ success: true, message: "Registered created successfully", data: newUser });
        } catch (error: Error | any) {
            return res.status(error.statusCode ?? 500).json({ success: false, message: error.message || "Internal Server Error" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const parsed = LoginUserDTO.safeParse(req.body);
            if (!parsed.success) return res.status(400).json({ success: false, message: z.prettifyError(parsed.error) });

            const { token, user } = await userService.loginUser(parsed.data);
            return res.status(200).json({ success: true, message: "Login successful", data: user, token });
        } catch (error: Error | any) {
            return res.status(error.statusCode || 500).json({ success: false, message: error.message || "Internal Server Error" });
        }
    }
}
