"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.Admin = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number,
    published: Boolean
});
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    purchasedCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Course" }] //like zod but for courseId being input from params 
});
const adminSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    createdCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Course" }]
});
exports.User = mongoose_1.default.model("User", userSchema);
exports.Admin = mongoose_1.default.model("Admin", adminSchema);
exports.Course = mongoose_1.default.model("Course", courseSchema);
