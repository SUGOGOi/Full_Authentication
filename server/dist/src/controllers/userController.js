import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendEmailVerificationOTP from "../utils/sendEmailVerificationOTP.js";
import { Otp } from "../models/otpModel.js";
import { setTokenCookies } from "../utils/setTokenCookies.js";
import { generateTokens } from "../utils/generateToken.js";
import { refreshAccessToken } from "../utils/refreshAccessToken.js";
import { UserRefreshToken } from "../models/userRefreshTokenModel.js";
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";
import { isJwtToken, validateID } from "../utils/checkID&Token.js";
// register
export const userRegistraion = async (req, res, next) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        if (!name || !email || !password || !confirm_password) {
            return res
                .status(400)
                .json({ success: false, error: "Enter all fields" });
        }
        if (password !== confirm_password) {
            return res
                .status(400)
                .json({ success: false, error: "Password not matched" });
        }
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res
                .status(409)
                .json({ success: false, error: "Email already exist" });
        }
        //generate salt and hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const { error } = await sendEmailVerificationOTP(res, {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
        if (error) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.errorMessage,
            });
        }
        return res.status(201).json({
            success: true,
            message: `Registration successfull`,
            user: {
                _id: newUser._id,
                email: newUser.email,
            },
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Server Error!" });
    }
};
// resend register verification otp
export const resendRegisterVerificationOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res
                .status(400)
                .json({ success: false, error: "email is required" });
        }
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(404).json({ success: false, error: "User not Found" });
        }
        const { error } = await sendEmailVerificationOTP(res, {
            _id: userFound._id,
            name: userFound.name,
            email: userFound.email,
        });
        if (error) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.errorMessage,
            });
        }
        return res.status(200).json({
            success: true,
            message: `OTP sent`,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Server Error!" });
    }
};
//email verification
export const emailVerification = async (req, res, next) => {
    try {
        const { email, otp } = req.body; // add email alsoqq
        if (!email || !otp) {
            return res
                .status(400)
                .json({ success: false, error: "All fields are required" });
        }
        const userFoud = await User.findOne({ email });
        if (!userFoud) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        const otpFound = await Otp.findOne({ userId: userFoud._id });
        if (!otpFound) {
            return res
                .status(404)
                .json({ success: false, error: "Invalid Otp or Otp expired" });
        }
        if (otp === otpFound.otp) {
            userFoud.is_verified = true;
            await userFoud.save();
        }
        else {
            return res
                .status(400)
                .json({ success: false, error: "Otp didn't matched" });
        }
        await otpFound.deleteOne();
        return res.status(200).json({
            success: true,
            message: `Verification Successful, You can now login!`,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Server Error!" });
    }
};
// login
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ success: false, error: "All fields are required" });
        }
        const userFound = await User.findOne({ email: email });
        if (!userFound) {
            return res
                .status(404)
                .json({ success: false, error: "Invalid email or password" });
        }
        if (!userFound.is_verified) {
            return res
                .status(401)
                .json({ success: false, error: "Your acoount is not verified" });
        }
        const isPasswordMatch = await bcrypt.compare(password, userFound.password);
        if (!isPasswordMatch) {
            return res
                .status(401)
                .json({ success: false, error: "Invalid email or password" });
        }
        //generate token
        const { accessToken, refreshToken } = await generateTokens({
            _id: userFound._id,
            role: userFound.role,
        });
        // //set cookie
        setTokenCookies(res, accessToken, refreshToken);
        //send success res
        return res.status(200).json({
            success: true,
            message: `Welcome ${userFound.name}`,
            is_auth: true,
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Server Error!" });
    }
};
// get new access token and refresh token
export const getNewAccessToken = async (req, res, next) => {
    try {
        //get new access token using refresh token
        const { newAccessToken, newRefreshToken, error } = await refreshAccessToken(req, res);
        if (error) {
            return res.status(error.statusCode).json({
                success: false,
                error: error.errorMessage,
            });
        }
        // set new access + refresh token to cookie
        setTokenCookies(res, newAccessToken, newRefreshToken);
        return res.status(200).json({
            success: true,
            message: `New Tokens are generated`,
            is_auth: true,
            newAccessToken,
            newRefreshToken,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Server Error!" });
    }
};
// profile or logged in user
export const getUserProfile = async (req, res) => {
    try {
        return res.json({ user: req.user });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, error: "Failed to load profile data" });
    }
};
// change password
export const changeUserPassword = async (req, res, next) => {
    try {
        const { password, confirm_password } = req.body;
        if (!password || !confirm_password) {
            return res.status(400).json({
                success: false,
                error: "Password and Confirm password are required",
            });
        }
        if (password !== confirm_password) {
            return res.status(400).json({
                success: false,
                error: "Password and Confirm password don't match",
            });
        }
        //generate salt and hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(password, salt);
        // @ts-ignore
        const userFound = await User.findById(req.user._id);
        if (!userFound) {
            return res.status(400).json({ success: false, error: "User not found" });
        }
        userFound.password = hashedPassword;
        await userFound.save();
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, error: "Failed to load profile data" });
    }
};
//send password reset link
export const sendResetPasswordLink = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }
        const userFound = await User.findOne({ email: email });
        if (!userFound) {
            return res.status(400).json({
                success: false,
                message: "Email doesn't exist",
            });
        }
        //generate token for password reset
        const resetPasswordToken = jwt.sign({ _id: userFound._id }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        //reset link
        const resetPasswordLink = `${process.env.FRONTEND_URL}/account/reset-password/${userFound._id}/${resetPasswordToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: userFound.email,
            subject: "Password Reset Link",
            html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      font-family: Arial, sans-serif;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .email-header {
      background-color: #4CAF50;
      padding: 20px;
      text-align: center;
      color: #ffffff;
      font-size: 24px;
    }
    .email-body {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }
    .reset-btn {
      display: block;
      text-align: center;
      margin: 50px auto;
      padding: 12px 24px;
      background-color: #4CAF50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
    }
    .reset-btn:hover {
      background-color: #45a049;
    }
    .email-footer {
      text-align: center;
      padding: 10px;
      font-size: 14px;
      background-color: #f4f4f4;
      color: #666666;
    }
    .email-footer a {
      color: #4CAF50;
      text-decoration: none;
    }
    @media (max-width: 600px) {
      .email-container {
        width: 100%;
      }
      .reset-btn {
        width: 90%;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      Password Reset Request
    </div>
    <div class="email-body">
      <p>Hi <strong>${userFound.name}</strong>,</p>
      <p>We received a request to reset your password. Click the button below to reset it. If you did not make this request, you can safely ignore this email.</p>
      <a href="${resetPasswordLink}" class="reset-btn">Reset Password</a>
      <p><strong>Note:</strong> This link will be valid for 5 minutes only.</p>
      <p>Thank you,<br>The [Your Company Name] Team</p>
    </div>
    <div class="email-footer">
      <p>&copy; 2025 [Your Company Name]. All rights reserved.</p>
      <p>
        <a target="_blank" href="${process.env.FRONTEND_URL}/contact">📞 Contact Support</a> | 
        <a target="_blank" href="${process.env.FRONTEND_URL}/privacy-policy">🔒 Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
`,
        });
        return res.status(200).json({
            success: true,
            message: "Password reset email sent",
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Failed to send reset link" });
    }
};
//password reset
export const userPasswordReset = async (req, res) => {
    try {
        const { newPassword, newConfirmPassword } = req.body;
        const { id, token } = req.params;
        if (!newPassword || !newConfirmPassword) {
            return res.status(400).json({
                success: false,
                error: "Password and Confirm password are required",
            });
        }
        if (newPassword !== newConfirmPassword) {
            return res.status(400).json({
                success: false,
                error: "Password and Confirm password don't match",
            });
        }
        if (!newPassword || !newConfirmPassword) {
            return res.status(400).json({
                success: false,
                error: "Password and Confirm password are required",
            });
        }
        const checkId = validateID(id);
        if (!checkId) {
            return res.status(400).json({ success: false, error: "Invalid Link" });
        }
        const checkToken = isJwtToken(token);
        if (!checkToken) {
            return res.status(400).json({ success: false, error: "Invalid token" });
        }
        const userFound = await User.findById(id);
        if (!userFound) {
            return res.status(400).json({ success: false, error: "User not found" });
        }
        //validate token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        //generate salt and hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        userFound.password = hashedPassword;
        await userFound.save();
        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    }
    catch (error) {
        // console.log(error);
        // @ts-ignore
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ success: false, error: "Link expired" });
        }
        return res.status(500).json({ success: false, error: "Server Error!" });
    }
};
// logout
export const userLogout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        await UserRefreshToken.findOneAndDelete({ token: refreshToken });
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json({ success: false, error: "Server Error!" });
    }
};
