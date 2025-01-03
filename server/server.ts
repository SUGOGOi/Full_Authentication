import app from "./app.js";
// import { connectDB } from "./src/config/dbConfig.js";
// import cloudinary from "cloudinary";
// import cron from "node-cron";
// import { checkExpiryDate } from "./src/controllers/vehicleController.js";

// connectDB();

// cloudinary.v2.config({
//   cloud_name: process.env.API_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// cron.schedule("* * * * *", checkExpiryDate);
// cron.schedule("0 0 * * *", checkExpiryDate);

app.listen(process.env.PORT, () =>
  console.log(`server is listening on port: ${process.env.PORT}`)
);
