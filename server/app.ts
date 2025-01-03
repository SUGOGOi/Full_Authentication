import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();

//using middlewares
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

// importing or using routes
// import auth from "./src/routes/authRoute.js";
// import client from "./src/routes/clientRoute.js";
// import vehicle from "./src/routes/vehicleRoute.js";
// import task from "./src/routes/taskAndContactRoute.js";

// app.use("/auth", auth);
// app.use("/client", client);
// app.use("/vehicle", vehicle);
// app.use("/other", task);

export default app;
