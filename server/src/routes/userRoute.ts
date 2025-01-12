import express from "express";
import { userRegistraion } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userRegistraion);

export default router;
