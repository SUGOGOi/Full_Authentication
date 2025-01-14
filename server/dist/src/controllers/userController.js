import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import sendEmailVerificationOTP from "../utils/sendEmailVerificationOTP.js";
import { Otp } from "../models/otpModel.js";
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
        sendEmailVerificationOTP(res, {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
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
        const { id } = req.query;
        if (!id) {
            return res
                .status(400)
                .json({ success: false, error: "user ID is required" });
        }
        const userFound = await User.findById(id);
        if (!userFound) {
            return res.status(404).json({ success: false, error: "User not Found" });
        }
        sendEmailVerificationOTP(res, {
            _id: userFound._id,
            name: userFound.name,
            email: userFound.email,
        });
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
        const { otp } = req.body;
        if (!otp) {
            return res.status(400).json({ success: false, error: "Otp is required" });
        }
        const otpFound = await Otp.findOne({ otp: otp });
        if (!otpFound) {
            return res
                .status(404)
                .json({ success: false, error: "Invalid Otp or Otp expired" });
        }
        const userFoud = await User.findById(otpFound.userId);
        if (!userFoud) {
            return res
                .status(404)
                .json({ success: false, error: "Invalid Otp or Otp expired" });
        }
        userFoud.is_verified = true;
        await userFoud.save();
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
// get new access token and refresh token
// change password
// profile or logged in user
//send password reset link
//password reset
// logout
