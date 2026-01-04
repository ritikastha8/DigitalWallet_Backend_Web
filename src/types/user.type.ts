import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3),
    mobileNumber: z
        .string()
        .min(10, "Mobile number must be at least 10 digits")
        .regex(/^[0-9]+$/, "Only numbers are allowed"),
    password: z.string().min(6),
    role: z.enum(["user", "admin"]).default("user"),
});

export type UserType = z.infer<typeof userSchema>;
