import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import userRoutes from "./routes/user"
import adminRoutes from "./routes/admin"

const app = express();
const port = 3000;

app.use(express.json());
app.listen(port, () => {
    console.log(`course selling app listening at http://localhost:${port}`)
});
app.use(cors());
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);


mongoose.connect("Your-connection-string", { dbName: "Course_with_recoil" })
