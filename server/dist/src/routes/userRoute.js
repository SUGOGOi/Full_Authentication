import express from "express";
import { emailVerification, getNewAccessToken, getUserProfile, resendRegisterVerificationOtp, userLogin, userRegistraion, } from "../controllers/userController.js";
import passport from "passport";
const router = express.Router();
router.post("/register", userRegistraion);
router.put("/resend-registration-otp", resendRegisterVerificationOtp);
router.put("/email-verification", emailVerification);
router.post("/login", userLogin);
//generate new access token + refresh token
router.get("/generate-new-tokens", getNewAccessToken);
//protected routes
router.get("/get-profile", passport.authenticate("jwt", { session: false }), getUserProfile);
export default router;
