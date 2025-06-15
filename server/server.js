import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";
import { router as authRouter } from "./routes/auth.router.js";
import { router as adminRouter } from "./routes/admin.router.js";
import ServiceRouter from "./routes/service.router.js";
import faqRouter from "./routes/faq.router.js";
import contactRouter from "./routes/contact.router.js";
import contactReplyRouter from "./routes/contactReply.router.js"
import connectDB from "./config/connectDB.js";
import cron from "node-cron";
import axios from "axios";

const app = express();
app.use(express.json());
const allowedOrigins = [
  "https://mohora-tech.onrender.com",
  "https://mohoratechnologies.netlify.app/"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

cron.schedule("*/3 * * * *", async () => {
  try {
    const response = await axios.get("https://mohoratechnologies.netlify.app/");
    console.log(`[CRON] Server pinged: ${response.status} - ${new Date().toLocaleString()}`);
  } catch (error) {
    console.error(`[CRON] Ping failed: ${error.message}`);
  }
});
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter,contactReplyRouter);
app.use("/api/services", ServiceRouter);
app.use("/api/faqs", faqRouter);
app.use("/api/contacts", contactRouter);
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("database connection failed", err);
  });
