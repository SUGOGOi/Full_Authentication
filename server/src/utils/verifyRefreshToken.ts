import jwt from "jsonwebtoken";
import { UserRefreshToken } from "../models/userRefreshTokenModel.js";

export const verifyRefreshToken = async (
  oldRefreshToken: string
): Promise<any> => {
  try {
    const findRefreshToken = await UserRefreshToken.findOne({
      token: oldRefreshToken,
    });

    if (!findRefreshToken) {
      throw { error: true, message: "Invalid Refresh Token" };
    }

    const tokenDetail = jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY!
    );

    return {
      tokenDetail,
      error: false,
    };
  } catch (error) {
    console.error("Error generating  access token:", error);
    throw new Error("Failed");
  }
};
