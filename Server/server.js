import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkWebHooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectCloudinary from "./config/cloudinary.js";
import {clerkMiddleware} from '@clerk/express'

//Initialise app
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

//conect to db
await connectDB();
await connectCloudinary().catch((err) =>
  console.error("❌ Cloudinary config error:", err)
);

//Routes
app.get("/", (req, res) => res.send("API working"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebHooks);
app.use("/api/company", companyRoutes);
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

Sentry.setupExpressErrorHandler(app);

//Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
