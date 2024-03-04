import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDatabase from "./db/connection.js";
import path from "path";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import cloudinary from "cloudinary";
import multer from "multer";
import { register, update } from "./controllers/auth.js";
import { verifyToken } from "./middleware/verifyToken.js";
import { createPost } from "./controllers/post.js";

// CONFIGURATION
dotenv.config();
const app = express();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

// ROUTES
app.post("/auth/register", upload.single('profileImage'), register);
app.patch("/auth/update", verifyToken, upload.single('profileImage'), update);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.post("/post/create", verifyToken, upload.single('image'), createPost);
app.use("/post", postRoutes);


// --------------- Deployment ---------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/client/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
    })
} else {
    console.log("API is Running Successfully");
}


// CONNECTION
const PORT = process.env.PORT;
connectDatabase();
app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});