const express = require('express');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require('cors');
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter)
app.use("/user", userRouter)

const SECRET = "sup3rs3cr3tsex";

mongoose.connect("mongodb+srv://RaunakA_:QTbajjyxdQEZMJDf@cluster0.ivcfy9f.mongodb.net", { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Course_Selling_App" });


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
})

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
})

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);


const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        req.decrypted = decoded;
        next();
      }
    })

  } else {
    res.sendStatus(400);
  }
}




// let ADMINS = [];
// let USERS = []; 
// let COURSES = []

//userList
app.get("/user/userList", async(req, res)=>{
  const userList = await User.find();
  res.json({userList: userList});
})

//adminList
app.get("/admin/adminList", async(req, res)=>{
  const adminList = await Admin.find();
  res.json({adminList: adminList});
})

// Admin routes
app.get("/admin/me", authenticateJwt, async (req, res) => { //works for users awa admins, coz it works using the authJwt middleware
  const user = await User.findOne({username:req.decrypted.username});
  const admin = await Admin.findOne({username:req.decrypted.username});
  res.json({
    user: user,
    admin:admin,
    username: req.decrypted.username,    
  });
})

app.post('/admin/signup', async (req, res) => {
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
app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (!admin) {
    res.sendStatus(401)
  } else {
    const token = jwt.sign({ username, password, role: "admin" }, SECRET, { expiresIn: "1h" });
    res.json({ message: "logged in successfully", token: token })
  }
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {

  // logic to create a course
  //const { username, password } = req.headers;
  console.log(req.decrypted.username)
  console.log(req.decrypted.password)
  const admin = await Admin.findOne({
    username: req.decrypted.username,
    password: req.decrypted.password
  });
  if (!admin) {
    res.sendStatus(401)
  } else {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.json({ message: "course created successfully", your_details: req.decrypted })
  }
});

app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
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
    res.status(500).json({ message: "An error occurred while updating the course" });
  }



});
// app.put('/admin/courses/:courseId', authenticateJwt, async (req, res) => {
//   // logic to edit a course // 

//   const courseId = req.params.courseId;
//   const { username, password } = req.headers;
//   const admin = await Admin.findOne({ username, password });
//   if (!admin) { res.sendStatus(401) }
//   else {
//     try {
//       const course = await Course.findById(courseId);
//       if (course) {
//         const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true });
//         res.json({ message: "course updated successfully" });
//       }else{
//         res.status(404).json({ message: "course not not not found" });

//       }
//     } catch (error) {
//       console.log(error)
//       res.status(404).json({ message: "course not found" });
//     }



//   }
//});

app.get('/admin/courses', authenticateJwt, async (req, res) => {
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

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.status(400).json({ message: "user already exists" })
  } else {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: "user successfully created" })
  }
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (!user) {
    console.log("hi")
    res.sendStatus(401);

  } else {
    console.log("ho")
    const token = jwt.sign({ username, password, role: "user" }, SECRET, { expiresIn: "2h" });
    res.json({ message: "logged in successfully", token: token });
  }
});

app.get('/users/courses', authenticateJwt, async (req, res) => {
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
app.post('/users/courses/:courseId', authenticateJwt, async (req, res) => {
  // logic to purchase a course
  console.log("1")
  const { username, password } = req.decrypted;
  const courseId = req.params.courseId;
  console.log(courseId)
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
      res.status(500).json({ error: "course doesn't exist" })
    }
  } else {
    console.log("7")
    res.status(401).send("incorrect username or password");
  }
});

app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
  // logic to view purchased courses
  const { username, password } = req.decrypted;
  const user = await User.findOne({ username, password });
  if (user) {
    const purchasedCourses = user.purchasedCourses;
    res.json({ Purchased_Courses: purchasedCourses })
  } else {
    res.sendStatus(401);
  }

});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
