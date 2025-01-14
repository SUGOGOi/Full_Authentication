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
    createdAt: { type: Date, default: Date.now, index: { expires: "10m" } }, // TTL index
});
export const Otp = mongoose.model("otp", otpSchema);
