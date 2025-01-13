import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export const Otp = mongoose.model("otp", otpSchema);
