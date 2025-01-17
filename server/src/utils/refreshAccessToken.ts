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

    if (!oldRefreshToken) {
      return {
        error: {
          statusCode: 401,
          errorMessage: "Unauthorized",
        },
      };
    }

    const { tokenDetail, error } = await verifyRefreshToken(oldRefreshToken);

    if (error) {
      return {
        error: {
          statusCode: error.statusCode,
          errorMessage: error.errorMessage,
        },
      };
    }

    const userFoud = await User.findById(tokenDetail._id);

    if (!userFoud) {
      return {
        error: {
          statusCode: 401,
          errorMessage: "Unauthorized",
        },
      };
    }

    const userRefreshToken = await UserRefreshToken.findOne({
      userId: tokenDetail._id,
    });

    if (
      oldRefreshToken !== userRefreshToken!.token ||
      userRefreshToken?.blacklisted
    ) {
      return {
        error: {
          statusCode: 401,
          errorMessage: "Unauthorized",
        },
      };
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
