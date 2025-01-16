import jwt from "jsonwebtoken";
import { UserRefreshToken } from "../models/userRefreshTokenModel.js";
export const generateTokens = async (user, req) => {
    try {
        // console.log("Generating tokens...");
        const payload = { _id: user._id, role: user.role };
        const accessToken = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        const refreshToken = jwt.sign({ ...payload }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
        const userRefreshToken = await UserRefreshToken.findOne({
            userId: user._id,
        });
        if (userRefreshToken) {
            await userRefreshToken.deleteOne();
        }
        // Save new refresh token
        await UserRefreshToken.create({
            userId: user._id,
            token: refreshToken,
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    catch (error) {
        console.error("Error generating tokens:", error);
        throw new Error("Failed to generate tokens");
    }
};
