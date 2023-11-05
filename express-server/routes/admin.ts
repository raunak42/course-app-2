import express from "express";
import jwt from "jsonwebtoken";
// import { courseInput, signupInput } from "@raunaka_/types";
import { signupInput, courseDetailsInput } from "@raunaka_/input-validation-for-course-app";
import { Admin, Course } from "../db";
import { SECRET, authenticateJwt } from "../middleware/auth";
const router = express.Router() 

router.get("/me", authenticateJwt, async (req, res) => {
    const adminId = req.headers["id"];
    const admin = await Admin.findById(adminId);
    if (admin) {
        return res.json({ admin })
    } else {
        return res.status(403).json({
            message: "Recheck adminId"
        });
    }
});

router.post("/signup", async (req, res) => {
    const parsedInput = signupInput.safeParse(req.body);
    if (parsedInput.success) {
        const { username, password } = parsedInput.data;
        const admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(403).json({ message: "Username taken" })
        } else {
            const newAdmin = new Admin({ username, password });
            await newAdmin.save();
            return res.json({ message: "Successfully signed up" })
        }
    } else {
        return res.status(411).json({ error: parsedInput.error })
    }
})

router.post("/login", async (req, res) => {
    const parsedInput = signupInput.safeParse(req.body);
    if (parsedInput.success) {
        const { username, password } = parsedInput.data;
        const admin = await Admin.findOne({ username, password });
        if (admin) {
            const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: "1h" });
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
    const adminId = req.headers["id"];
    const admin = await Admin.findById({ _id: adminId });
    if (admin) {
        const courses = await Course.find();
        return res.json({
            courses
        })
    } else {
        return res.json({ message: "Incorrect username or password" })
    }
});

router.get("/myCourses", authenticateJwt, async (req, res) => {
    const adminId = req.headers["id"];
    const admin = await Admin.findById({ _id: adminId });
    if (admin) {
        const myCourses = admin.createdCourses;
        return res.json({ myCourses })
    } else {
        return res.status(403).json({ message: "Recheck the adminId" })
    }
});

router.post("/addCourse", authenticateJwt, async (req, res) => {
    const adminId = req.headers["id"];
    const admin = await Admin.findById({ _id: adminId });
    if (admin) {
        const parsedCourseInput = courseDetailsInput.safeParse(req.body);

        if (parsedCourseInput.success) {
            parsedCourseInput.data.published = true;
            const course = new Course(parsedCourseInput.data);
            await course.save();

            const courseId = course._id;
            admin.createdCourses.push(courseId);
            await admin.save();

            return res.json({ message: "course created succesfully" })
        } else {
            return res.status(411).json({
                error: parsedCourseInput.error
            })
        }
    } else {
        return res.status(403).json({ message: "Recheck the adminId" })
    }
});

router.put("/course/:id", authenticateJwt, async (req, res) => {
    const adminId = req.headers["id"];
    const admin = await Admin.findById({ _id: adminId });
    try {
        if (admin) {
            const courseId = req.params.id;
            const parsedUpdateCourseInput = courseDetailsInput.safeParse(req.body);
            if (parsedUpdateCourseInput.success) {
                const updatedCourse = parsedUpdateCourseInput.data;
                const course = await Course.findByIdAndUpdate(courseId, updatedCourse, { new: true });
                if (course) {
                    await course.save();
                    return res.json({ message: "Course updated successfully", course })
                } else {
                    return res.status(411).json({ message: "Recheck courseId" })
                }
            } else {
                return res.json({
                    error: parsedUpdateCourseInput.error
                })
            }

        } else {
            return res.status(403).json({ message: "Recheck the adminId" });
        }
    } catch (error) {
        return res.json({ error });
    }
});

router.delete("/course/:id", authenticateJwt, async (req, res) => {
    const adminId = req.headers["id"];
    const admin = await Admin.findById(adminId);
    try {
        if (admin) {
            const courseId = req.params.id;
            await Course.findByIdAndDelete(courseId);
            return res.json({ message: "Course deleted successfully" });
        } else {
            return res.status(403).json({ message: "Recheck the adminId" });
        }
    } catch (error) {
        return res.json(error)

    }

});


export default router;