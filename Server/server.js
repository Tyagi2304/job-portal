import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkWebHooks } from "./controllers/webhooks.js";

//Initialise app
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//conect to db
await connectDB();

//Routes
app.get("/", (req, res) => res.send("API working"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebHooks);

//Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
