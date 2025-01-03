import app from "./app.js";
import { connectDB } from "./src/config/connectDB.js";

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`server is listening on port: ${process.env.PORT}`)
);
