import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
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
//email verification
// login
// get new access token and refresh token
// change password
// profile or logged in user
//send password reset link
//password reset
// logout
