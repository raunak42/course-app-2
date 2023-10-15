const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
//const commonRouter = require("./name")

const app = express();
app.use(express.json());
app.use(cors()); 

app.use("/admin", adminRouter)
app.use("/users", userRouter)

mongoose.connect("mongodb+srv://RaunakA_:QTbajjyxdQEZMJDf@cluster0.ivcfy9f.mongodb.net", { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Course_with_recoil" });

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
}); 
