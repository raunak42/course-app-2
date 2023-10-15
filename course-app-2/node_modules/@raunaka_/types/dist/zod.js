"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string().min(2).max(21),
    password: zod_1.z.string().min(8).max(21)
        .refine(p => {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?+-=()~`<>|{}:;'"])/.test(p);
    }, {
        message: "Password must contain at least one uppercase letter, one number, and one special character."
    })
});
exports.courseInput = zod_1.z.object({
    title: zod_1.z.string().min(3).max(28),
    description: zod_1.z.string().min(10).max(45),
    imageLink: zod_1.z.string(),
    price: zod_1.z.number(),
    published: zod_1.z.boolean()
});
