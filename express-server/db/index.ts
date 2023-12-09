import mongoose from "mongoose";
 
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number,
    published: Boolean
});
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] //like zod but for courseId being input from params 
});
const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

export const User = mongoose.model("User", userSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export const Course = mongoose.model("Course", courseSchema);