import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Za-z]/, "Password must contain at least one letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

export type UserInput = z.infer<typeof userSchema>;
