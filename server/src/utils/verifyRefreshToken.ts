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
      return {
        error: {
          statusCode: 401,
          errorMessage: "Unauthorized",
        },
      };
    }

    const tokenDetail = jwt.verify(
      oldRefreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY!
    );

    return {
      tokenDetail,
    };
  } catch (error) {
    console.error("Error generating  access token:", error);
    throw new Error("Failed");
  }
};
