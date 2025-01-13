import mongoose from "mongoose";
import { IOtp } from "../Types/types.js";

const otpSchema = new mongoose.Schema<IOtp>(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Otp = mongoose.model<IOtp>("otp", otpSchema);
