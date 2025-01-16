import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const userRefreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: process.env.REFRESH_TOKEN_EXPIRY || "5d",
    },
});
export const UserRefreshToken = mongoose.model("userrefreshtoken", userRefreshTokenSchema);
