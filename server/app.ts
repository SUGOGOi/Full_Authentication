import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "./src/config/passportConfig.js";
import "./src/config/googleAuth20Config.js";
import transporter from "./src/config/emailConfig.js";

dotenv.config();

const app = express();

//using middlewares
// app.use(passport.initialize());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

// Verify the transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("Error setting up transporter:", error);
  } else {
    console.log("Mailer is ready to send emails");
  }
});

// importing or using routes
import userRoutes from "./src/routes/userRoute.js";
import googleAuthRoutes from "./src/routes/googleAuthRoutes.js";

app.use("/api/user", userRoutes);
app.use("", googleAuthRoutes);

export default app;
