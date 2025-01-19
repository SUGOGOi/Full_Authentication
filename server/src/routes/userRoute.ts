import express from "express";
import {
  changeUserPassword,
  emailVerification,
  getNewAccessToken,
  getUserProfile,
  resendRegisterVerificationOtp,
  sendResetPasswordLink,
  userLogin,
  userLogout,
  userPasswordReset,
  userRegistraion,
} from "../controllers/userController.js";
import passport from "passport";
import { accessTokenAutoRefresh } from "../middlewares/accessTokenAutoRefresh.js";

const router = express.Router();

router.post("/register", userRegistraion);
router.put("/resend-registration-otp", resendRegisterVerificationOtp);
router.put("/email-verification", emailVerification);
router.post("/login", userLogin);
router.post("/reset-password-link", sendResetPasswordLink);
router.post("/reset-password/:id/:token", userPasswordReset);

//generate new access token + refresh token
router.get("/refresh-tokens", getNewAccessToken);

//protected routes
router.get(
  "/get-profile",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);

router.post(
  "/logout",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  userLogout
);

router.post(
  "/change-password",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  changeUserPassword
);

export default router;
