import express from "express";
import {
  emailVerification,
  resendRegisterVerificationOtp,
  userLogin,
  userRegistraion,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userRegistraion);
router.put("/resend-registration-otp", resendRegisterVerificationOtp);
router.put("/email-verification", emailVerification);
router.post("/login", userLogin);

export default router;
