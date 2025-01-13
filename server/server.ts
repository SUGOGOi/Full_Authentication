import app from "./app.js";
import { connectDB } from "./src/config/dbConfig.js";

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`server is listening on port: ${process.env.PORT}`)
);
