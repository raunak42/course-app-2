const mongoose = require("mongoose");
const express = require("express");
const { User, Course, Admin } = require("../db/schema")
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth.js");
const { authenticateJwt } = require("../middleware/auth.js");

const router = express.Router();

//adminList 
router.get("/adminList", async (req, res) => {
    const adminList = await Admin.find();
    res.json({ adminList: adminList });
})

router.get("/me", authenticateJwt, async (req, res) => { //works for users awa admins, coz it works using the authJwt middleware
    const admin = await Admin.findOne({ username: req.decrypted.username });
    if (!admin) {
        res.status(403).json({ message: "admin doesn't exist" })
    }
    else {
        res.json({
            admin: admin
        })
    }
});

router.post('/signup', async (req, res) => {
    // logic to sign up admin
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
        res.status(409).json({
            message: "username taken"
        })
    } else {
        let adminObj = {
            username: username,
            password: password
        }
        let newAdmin = new Admin(adminObj); //OR new Admin(req.body)
        await newAdmin.save();
        res.json({
            message: "admin created successfully",
        })
    }
});

//logging in gives the user the token, which can be used for accessing further routes.
router.post('/login', async (req, res) => {
    // logic to log in admin
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (!admin) {
        res.status(401).json({ message: "incorrect username or password" })
    } else {
        const token = jwt.sign({ username, password, role: "admin" }, SECRET, { expiresIn: "1h" });
        res.json({ message: "logged in successfully", token: token })
    }
});

router.post('/courses', authenticateJwt, async (req, res) => {

    // logic to create a course
    //const { username, password } = req.headers;
    console.log(req.decrypted.username)
    console.log(req.decrypted.password)
    const admin = await Admin.findOne({
        username: req.decrypted.username,
        password: req.decrypted.password
    });
    if (!admin) {
        res.status(401).json({ message: "admin doesn't exist" })
    } else {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.json({ message: "course created successfully", your_details: req.decrypted })
    }
});

router.put('/courses/:courseId', authenticateJwt, async (req, res) => {
    // logic to edit a course // 
    try {
        const courseId = req.params.courseId;
        console.log(courseId);
        const { username, password } = req.decrypted;
        const admin = await Admin.findOne({ username, password });
        if (!admin) { res.sendStatus(401) }
        else {
            const course = await Course.findById(courseId);
            if (!course) {
                //control reaches here if the user inputs a wrong hexadecimal courseId
                res.status(404).json({ message: "course not found" });
            } else {
                const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true });
                res.json({ message: "course updated successfully" });
            }

        }
    } catch (error) {
        //control reaches her if the user inputs anything other than a hexadecimal.
        //console.log(error)
        res.status(500).json({ message: error.message });
    }



});

router.get('/courses', authenticateJwt, async (req, res) => {
    // logic to get all courses
    const admin = await Admin.findOne({
        username: req.decrypted.username,
        password: req.decrypted.password
    })
    if (admin) {
        const courses = await Course.find({});
        console.log(courses);
        res.json({ courses: courses })
    } else {
        res.sendStatus(401);
    }
});

router.get('/course/:courseId', authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({ course });
});

module.exports = router