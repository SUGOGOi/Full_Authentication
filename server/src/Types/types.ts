import mongoose, { Document } from "mongoose";

export interface UserType {
  email: string;
  _id: string;
  name: string;
}

// FOR USER MODEL
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  is_verified?: string;
  role?: UserRole;
  googoleId?: string;
  githubId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

// FOR OTP MODEL
export interface IOtp extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  otp: string;
}
