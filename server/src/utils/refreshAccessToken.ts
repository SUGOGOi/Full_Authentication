import { Response, Request } from "express";
import { verifyRefreshToken } from "./verifyRefreshToken.js";
import { User } from "../models/userModel.js";
import { UserRefreshToken } from "../models/userRefreshTokenModel.js";
import { generateTokens } from "./generateToken.js";

export const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    //verify refresh token is valid or not + expiry

    const { tokenDetail, error } = await verifyRefreshToken(oldRefreshToken);

    if (error) {
      throw { error: true, message: "Invalid Refresh Token" };
    }

    const userFoud = await User.findById(tokenDetail._id);

    if (!userFoud) {
      throw { error: true, message: "User not found" };
    }

    const userRefreshToken = await UserRefreshToken.findOne({
      userId: tokenDetail._id,
    });

    if (
      oldRefreshToken !== userRefreshToken!.token ||
      userRefreshToken?.blacklisted
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { accessToken, refreshToken } = await generateTokens({
      _id: userFoud._id,
      role: userFoud.role!,
    });

    return { newAccessToken: accessToken, newRefreshToken: refreshToken };
  } catch (error) {
    console.error("Error generating  access token:", error);
    throw new Error("Failed to refresh access token");
  }
};
