import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import routes from "./src/routes/index.js"; // main dynamic router

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Base API route (all routes handled dynamically inside routes/index.js)
app.use("/api", routes);

// Test route
app.get("/", (req, res) => {
    res.send("E-Commerce API is running...");
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch((err) => console.error(err));
