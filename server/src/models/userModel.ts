import mongoose, { Document, Schema } from "mongoose";

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

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // for social auth users
    },
    role: {
      type: String,
      enum: Object.values(UserRole), // Allow only enum values
      default: UserRole.USER, // Set a default role
    },
    is_verified: {
      type: Boolean,
      required: false,
    },
    googoleId: {
      type: String,
      required: false,
    },
    githubId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("user", UserSchema);
