import { z } from "zod";

export const signupInput = z.object({
    username: z.string().min(2).max(21),
    password: z.string().min(8).max(21)
        .refine(p => {
            return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?+-=()~`<>|{}:;'"])/.test(p);
        }, {
            message: "Password must contain at least one uppercase letter, one number, and one special character."
        })
});

export const courseInput = z.object({
    title: z.string().min(3).max(28),
    description: z.string().min(10).max(45),
    imageLink: z.string(),
    price: z.number(),
    published: z.boolean()
});

export type SignupParams = z.infer<typeof signupInput>
export type CourseParmas = z.infer<typeof courseInput>