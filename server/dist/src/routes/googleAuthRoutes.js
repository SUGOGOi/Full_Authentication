import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import { setTokenCookies } from "../utils/setTokenCookies.js";
dotenv.config();
const router = express.Router();
router.get("/auth/google", passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
}));
router.get("/auth/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/auth/login`,
}), async (req, res) => {
    // Validate req.user
    if (!req.user) {
        return res.status(400).json({ error: "Authentication failed." });
    }
    const { userFound, statusCode, accessToken, refreshToken } = req.user;
    // //set cookie
    setTokenCookies(res, accessToken, refreshToken);
    return res.redirect(`${process.env.FRONTEND_URL}/user/profile`);
});
export default router;
