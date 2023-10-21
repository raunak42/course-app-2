"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { courseInput, signupInput } from "@raunaka_/types";
const input_validation_for_course_app_1 = require("@raunaka_/input-validation-for-course-app");
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/me", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = req.headers["id"];
    const admin = yield db_1.Admin.findById(adminId);
    if (admin) {
        return res.json({ admin });
    }
    else {
        return res.status(403).json({
            message: "Recheck adminId"
        });
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = input_validation_for_course_app_1.signupInput.safeParse(req.body);
    if (parsedInput.success) {
        const { username, password } = parsedInput.data;
        const admin = yield db_1.Admin.findOne({ username });
        if (admin) {
            return res.status(403).json({ message: "Username taken" });
        }
        else {
            const newAdmin = new db_1.Admin({ username, password });
            yield newAdmin.save();
            return res.json({ message: "Successfully signed up" });
        }
    }
    else {
        return res.status(411).json({ error: parsedInput.error });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = input_validation_for_course_app_1.signupInput.safeParse(req.body);
    if (parsedInput.success) {
        const { username, password } = parsedInput.data;
        const admin = yield db_1.Admin.findOne({ username, password });
        if (admin) {
            const token = jsonwebtoken_1.default.sign({ id: admin._id }, auth_1.SECRET, { expiresIn: "1h" });
            return res.json({
                message: "Successfully logged in",
                token
            });
        }
        else {
            return res.status(403).json({
                message: "Incorrect username or password"
            });
        }
    }
    else {
        return res.status(401).json({
            error: parsedInput.error
        });
    }
}));
router.get("/courses", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = req.headers["id"];
    const admin = yield db_1.Admin.findById({ _id: adminId });
    if (admin) {
        const courses = yield db_1.Course.find();
        return res.json({
            courses
        });
    }
    else {
        return res.json({ message: "Incorrect username or password" });
    }
}));
router.get("/myCourses", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = req.headers["id"];
    const admin = yield db_1.Admin.findById({ _id: adminId });
    if (admin) {
        const myCourses = admin.createdCourses;
        return res.json({ myCourses });
    }
    else {
        return res.status(403).json({ message: "Recheck the adminId" });
    }
}));
router.post("/addCourse", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = req.headers["id"];
    const admin = yield db_1.Admin.findById({ _id: adminId });
    if (admin) {
        const parsedCourseInput = input_validation_for_course_app_1.courseDetailsInput.safeParse(req.body);
        if (parsedCourseInput.success) {
            parsedCourseInput.data.published = true;
            const course = new db_1.Course(parsedCourseInput.data);
            yield course.save();
            const courseId = course._id;
            admin.createdCourses.push(courseId);
            yield admin.save();
            return res.json({ message: "course created succesfully" });
        }
        else {
            return res.status(411).json({
                error: parsedCourseInput.error
            });
        }
    }
    else {
        return res.status(403).json({ message: "Recheck the adminId" });
    }
}));
router.put("/course/:id", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = req.headers["id"];
    const admin = yield db_1.Admin.findById({ _id: adminId });
    try {
        if (admin) {
            const courseId = req.params.id;
            const parsedUpdateCourseInput = input_validation_for_course_app_1.courseDetailsInput.safeParse(req.body);
            if (parsedUpdateCourseInput.success) {
                const updatedCourse = parsedUpdateCourseInput.data;
                const course = yield db_1.Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });
                if (course) {
                    yield course.save();
                    return res.json({ message: "Course updated successfully", course });
                }
                else {
                    return res.status(411).json({ message: "Recheck courseId" });
                }
            }
            else {
                return res.json({
                    error: parsedUpdateCourseInput.error
                });
            }
        }
        else {
            return res.status(403).json({ message: "Recheck the adminId" });
        }
    }
    catch (error) {
        return res.json({ error });
    }
}));
router.delete("/course/:id", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = req.headers["id"];
    const admin = yield db_1.Admin.findById(adminId);
    if (admin) {
        const courseId = req.params.id;
        yield db_1.Course.findByIdAndDelete(courseId);
        return res.json({ message: "Course deleted successfully" });
    }
    else {
        return res.status(403).json({ message: "Recheck the adminId" });
    }
}));
exports.default = router;
