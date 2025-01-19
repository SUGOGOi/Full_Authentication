import mongoose, { Document } from "mongoose";

export interface EmailVariables {
  EMAIL_HOST: string | undefined;
  EMAIL_PORT: string | undefined;
  EMAIL_SERVICE: string | undefined;
  EMAIL_USER: string | undefined;
  EMAIL_PASSWORD: string | undefined;
}

export interface UserTypeInEmail {
  email: string;
  _id: string | any;
  name: string;
}

export interface UserTypeInTokens {
  _id: string | any;
  role: string;
}

// FOR USER MODEL
export interface IUser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  is_verified?: boolean;
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
  createdAt: Date;
}

// user refresh token model
export interface IUserRefreshToken extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  blacklisted: boolean;
  createdAt: Date;
}

//generate token return
export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

//set cookie options
export interface SetCookieOption {
  expires: Date;
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | "strict" | "lax" | "none" | undefined;
}
