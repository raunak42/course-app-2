import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    purchasedCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    purchasedCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
}> & {
    purchasedCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    purchasedCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    purchasedCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
}>> & mongoose.FlatRecord<{
    purchasedCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export declare const Admin: mongoose.Model<{
    createdCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
}> & {
    createdCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
}>> & mongoose.FlatRecord<{
    createdCourses: mongoose.Types.ObjectId[];
    username?: string | undefined;
    password?: string | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
export declare const Course: mongoose.Model<{
    title?: string | undefined;
    description?: string | undefined;
    imageLink?: string | undefined;
    price?: number | undefined;
    published?: boolean | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    title?: string | undefined;
    description?: string | undefined;
    imageLink?: string | undefined;
    price?: number | undefined;
    published?: boolean | undefined;
}> & {
    title?: string | undefined;
    description?: string | undefined;
    imageLink?: string | undefined;
    price?: number | undefined;
    published?: boolean | undefined;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    title?: string | undefined;
    description?: string | undefined;
    imageLink?: string | undefined;
    price?: number | undefined;
    published?: boolean | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    title?: string | undefined;
    description?: string | undefined;
    imageLink?: string | undefined;
    price?: number | undefined;
    published?: boolean | undefined;
}>> & mongoose.FlatRecord<{
    title?: string | undefined;
    description?: string | undefined;
    imageLink?: string | undefined;
    price?: number | undefined;
    published?: boolean | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
