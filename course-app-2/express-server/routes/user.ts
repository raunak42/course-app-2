import express from "express";
import jwt from "jsonwebtoken";
import { signupInput } from "@raunaka_/types";
import { User, Course } from "../db";
import { SECRET, authenticateJwt } from "../middleware/auth";
import mongoose from "mongoose";

const router = express.Router()

router.get("/me", authenticateJwt, async (req, res) => {
    const userId = req.headers["id"];
    const user = await User.findById(userId);
    if (user) {
        return res.json({ user })
    } else {
        return res.status(403).json({
            message: "Recheck adminId"
        });
    }
});

router.post("/signup", async (req, res) => {
    let parsedInput = signupInput.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(411).json({
            error: parsedInput.error
        });
        return;
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;

    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({ message: "Username taken" })
    } else {
        const newUser = new User({ username, password });
        await newUser.save();
        res.json({ message: "Successfully signed up" })
    }
});

router.post("/login", async (req, res) => {
    const parsedInput = signupInput.safeParse(req.body);
    if (parsedInput.success) {
        const { username, password } = parsedInput.data;
        const user = await User.findOne({ username, password });
        if (user) {
            const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
            return res.json({
                message: "Successfully logged in",
                token
            });
        } else {
            return res.status(403).json({
                message: "Incorrect username or password"
            })
        }
    } else {
        return res.status(401).json({
            error: parsedInput.error
        })
    }
});

router.get("/courses", authenticateJwt, async (req, res) => {
    const userId = req.headers["id"];
    const user = await User.findById({ _id: userId });
    if (user) {
        const courses = await Course.find();
        if (courses) {
            return res.json({ courses })
        } else {
            return res.json({ message: "Database error fetching courses" })
        }
    } else {
        return res.status(403).json({ message: "Recheck the userId" })
    }
})

router.post("/course/:ide", authenticateJwt, async (req, res) => {
    const userId = req.headers["id"];
    const user = await User.findById(userId);
    if (user) {
        try {
            const courseId = new mongoose.Types.ObjectId(req.params.ide); //typechecking because this courseId will be sent to be stored in the db. You don't want any random thing entering there.
            const course = user.purchasedCourses.find((t) => t.toString() === courseId.toString())
            if (course) {
                return res.json({ message: "Already purchased the course." })
            } else {
                user.purchasedCourses.push(courseId);
                await user.save();
                return res.json({ message: "Purchase Successful" })
            }
        } catch (error) {
            return res.json({ message: "Recheck the courseId" })
        }
    } else {
        return res.status(403).json({ message: "Recheck the userId" });
    }
});

router.get("/myCourses", authenticateJwt, async (req, res) => {
    const userId = req.headers["id"];
    const user = await User.findById({ _id: userId });
    if (user) {
        const myCourses = user.purchasedCourses;
        return res.json({ myCourses });
    } else {
        return res.status(403).json({ message: "Recheck the userId" });
    }
})

export default router;