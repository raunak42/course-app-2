const mongoose = require("mongoose");
const express = require("express");
const { User, Course, Admin } = require("../db/schema")
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth.js"); 
const { authenticateJwt } = require("../middleware/auth.js");

const router = express.Router();

//userList 
router.get("/userList", async (req, res) => {
  const userList = await User.find();
  res.json({ userList });
})

router.get("/me", authenticateJwt, async (req, res) => { //works for users awa admins, coz it works using the authJwt middleware
  const user = await User.findOne({ username: req.decrypted.username });
  if (!user) {
    res.status(403).json({ message: "user doesn't exist" })
  }
  else {
    res.json({
      user: user
    })
  }
});

// User routes
router.post('/signup', async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.status(400).json({ message: "username taken" });
  } else {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: "user successfully created" })
  }
});

router.post('/login', async (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (!user) {
    console.log("hi")
    res.status(401).json({ message: "incorrect username or password" });

  } else {
    console.log("ho")
    const token = jwt.sign({ username, password, role: "user" }, SECRET, { expiresIn: "2h" });
    res.json({ message: "logged in successfully", token: token });
  }
});

router.get('/courses', authenticateJwt, async (req, res) => {
  // logic to list all courses

  const { username, password } = req.decrypted;
  const user = await User.findOne({ username, password });
  if (user) {
    const courses = await Course.find({});
    res.json({ courses: courses });
  } else {
    res.status(401).send("incorrect username or password")
  }
});
router.post('/courses/:courseId', authenticateJwt, async (req, res) => {
  // logic to purchase a course
  console.log("1")
  const { username, password } = req.decrypted;
  const courseId = req.params.courseId;
  console.log(courseId + " id")
  const user = await User.findOne({ username, password });
  if (user) {
    try {
      console.log("2")
      const course = await Course.findById(courseId);
      const alreadyPurchasedCourse = user.purchasedCourses.some(t => t.equals(course._id));
      if (alreadyPurchasedCourse) {
        console.log("3")
        res.json({ message: "you already purchased the course" })
      } else {
        console.log("4")
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: "successfully purchased the course" });
        console.log("5")
      }

    } catch (error) {
      console.log("6")
      res.status(500).json({ message: "course doesn't exist" })
    }
  } else {
    console.log("7")
    res.status(401).json({ message: "incorrect username or password" });
  }
});

router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
  // logic to view purchased courses
  const { username, password } = req.decrypted;
  const user = await User.findOne({ username, password });
  if (user) {
    const purchasedCourses = user.purchasedCourses;
    res.json({ Purchased_Courses: purchasedCourses })
  } else {
    res.status(401);
  }

});
module.exports = router