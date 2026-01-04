import { z } from "zod";
import { userSchema } from "../types/user.type";

// Register DTO
export const CreateUserDTO = userSchema.pick(// re use userSchema
    {
        name:true, // true - include form userSchema
        mobileNumber:true,
        password:true,
    }
).extend({
    confirmPassword: z.string().min(6),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;

// Login DTO
export const LoginUserDTO = z.object({
    mobileNumber: z
        .string()
        .min(10)
        .regex(/^[0-9]+$/, "Only numbers allowed"),
    password: z.string().min(6),
});

export type LoginUserDTO = z.infer<typeof LoginUserDTO>;
