"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    username: zod_1.z
        .string({ required_error: "Username is required" })
        .min(3, { message: "Username must be at least 3 characters" }),
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email({ message: "Email must be a valid email" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email({ message: "Email must be a valid email" }),
    password: zod_1.z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),
});
