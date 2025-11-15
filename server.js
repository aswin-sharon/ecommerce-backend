import express from "express";
import cors from "cors";
import ENV from "./src/config/env.js";
import connectDB from "./src/config/db.js";
import routes from "./src/routes/index.js"; // main dynamic router

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
// Connect DB, then start server
const startServer = async () => {
    try {
        await connectDB(); // Wait for MongoDB connection
        app.listen(ENV.PORT || 5000, () => {
            console.log(`Server running on http://localhost:${ENV.PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
// mongoose.connect(ENV.MONGO_URI)
//     .then(() => {
//         console.log("MongoDB connected");
//         app.listen(ENV.PORT || 5000, () => {
//             console.log(`Server running on port ${ENV.PORT || 5000}`);
//         });
//     })
//     .catch((err) => console.error(err));
