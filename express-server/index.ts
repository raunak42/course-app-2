import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import userRoutes from "./routes/user"
import adminRoutes from "./routes/admin"
import path from "path"

const app = express();
const port = 3000;

app.use(express.json());
app.listen(port, () => {
    console.log(`course selling app listening at http://localhost:${port}`)
});
app.use(cors());
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.use(express.static("public"));

app.use("/*", (_, res) => {
    res.sendFile(path.join(__dirname, "/../public/index.html")); //__dirname points to the dir containing index.js file
})


mongoose.connect("mongodb+srv://RaunakA_:QTbajjyxdQEZMJDf@cluster0.ivcfy9f.mongodb.net/", { dbName: "Course_with_recoil" })
