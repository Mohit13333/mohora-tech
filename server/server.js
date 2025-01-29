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

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter,contactReplyRouter);
app.use("/api/services", ServiceRouter);
app.use("/api/faqs", faqRouter);
app.use("/api/contacts", contactRouter);
// app.use("/api/replies",contactReplyRouter);
app.get("/", (req, res) => {
  res.end("Hello");
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("database connection failed", err);
  });
