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
const types_1 = require("@raunaka_/types");
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.get("/me", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["id"];
    const user = yield db_1.User.findById(userId);
    if (user) {
        return res.json({ user });
    }
    else {
        return res.status(403).json({
            message: "Recheck adminId"
        });
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let parsedInput = types_1.signupInput.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json({
            error: parsedInput.error
        });
        return;
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const user = yield db_1.User.findOne({ username });
    if (user) {
        res.status(403).json({ message: "Username taken" });
    }
    else {
        const newUser = new db_1.User({ username, password });
        yield newUser.save();
        res.json({ message: "Successfully signed up" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.signupInput.safeParse(req.body);
    if (parsedInput.success) {
        const { username, password } = parsedInput.data;
        const user = yield db_1.User.findOne({ username, password });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, auth_1.SECRET, { expiresIn: "1h" });
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
    const userId = req.headers["id"];
    const user = yield db_1.User.findById({ _id: userId });
    if (user) {
        const courses = yield db_1.Course.find();
        if (courses) {
            return res.json({ courses });
        }
        else {
            return res.json({ message: "Database error fetching courses" });
        }
    }
    else {
        return res.status(403).json({ message: "Recheck the userId" });
    }
}));
router.post("/course/:ide", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["id"];
    const user = yield db_1.User.findById(userId);
    if (user) {
        try {
            const courseId = new mongoose_1.default.Types.ObjectId(req.params.ide); //typechecking because this courseId will be sent to be stored in the db. You don't want any random thing entering there.
            const course = user.purchasedCourses.find((t) => t.toString() === courseId.toString());
            if (course) {
                return res.json({ message: "Already purchased the course." });
            }
            else {
                user.purchasedCourses.push(courseId);
                yield user.save();
                return res.json({ message: "Purchase Successful" });
            }
        }
        catch (error) {
            return res.json({ message: "Recheck the courseId" });
        }
    }
    else {
        return res.status(403).json({ message: "Recheck the userId" });
    }
}));
router.get("/myCourses", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers["id"];
    const user = yield db_1.User.findById({ _id: userId });
    if (user) {
        const myCourses = user.purchasedCourses;
        return res.json({ myCourses });
    }
    else {
        return res.status(403).json({ message: "Recheck the userId" });
    }
}));
exports.default = router;
