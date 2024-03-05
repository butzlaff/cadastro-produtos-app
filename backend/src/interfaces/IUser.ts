import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const userLoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email must be a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type TUser = z.infer<typeof userSchema>;
export type TUserLogin = z.infer<typeof userLoginSchema>;

export default interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  username: string;
  password: string;
}
