import { z } from "zod";
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const courseInput: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    imageLink: z.ZodString;
    price: z.ZodNumber;
    published: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    imageLink: string;
    price: number;
    published: boolean;
}, {
    title: string;
    description: string;
    imageLink: string;
    price: number;
    published: boolean;
}>;
export type SignupParams = z.infer<typeof signupInput>;
export type CourseParmas = z.infer<typeof courseInput>;
