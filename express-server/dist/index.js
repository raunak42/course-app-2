"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`course selling app listening at http://localhost:${port}`);
});
app.use((0, cors_1.default)());
app.use("/user", user_1.default);
app.use("/admin", admin_1.default);
app.use(express_1.default.static("public"));
app.use("/*", (_, res) => {
    res.sendFile(path_1.default.join(__dirname, "/../public/index.html")); //__dirname points to the dir containing index.js file
});
mongoose_1.default.connect("mongodb+srv://RaunakA_:QTbajjyxdQEZMJDf@cluster0.ivcfy9f.mongodb.net/", { dbName: "Course_with_recoil" });
