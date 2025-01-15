import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserTypeInTokens } from "../Types/types.js";

export const generateTokens = async (
  user: UserTypeInTokens,
  res: Response
): Promise<object> => {
  try {
    const payload = { _id: user._id, role: user.role };

    const accessToken = jwt.sign(
      { ...payload },
      process.env.ACCESS_TOKEN_SECRET_KEY!,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { ...payload },
      process.env.REFRESH_TOKEN_SECRET_KEY!,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Server Error!" });
  }
};
