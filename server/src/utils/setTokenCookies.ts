import { Response } from "express";
import { SetCookieOption } from "../Types/types.js";

export const setTokenCookies = async (
  res: Response,
  accessToken: string,
  refreshToken: string
): Promise<any> => {
  try {
    //access token area
    const accessTokenExpiry = new Date(
      Date.now() +
        Number(process.env.SET_COOKIE_ACCESS_TOKEN_EXPIRY) * 60 * 1000 // 5 * 1 min
    );
    const accessTokenOptions: SetCookieOption = {
      expires: accessTokenExpiry,
      httpOnly: process.env.NODE_ENV === "production", // Cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Helps prevent CSRF attacks
    };
    // set access token
    res.cookie("accessToken", accessToken, accessTokenOptions);

    // refresh token area
    const refreshTokenExpiry = new Date(
      Date.now() +
        Number(process.env.SET_COOKIE_REFRESH_TOKEN_EXPIRY) *
          24 *
          60 *
          60 *
          1000 // 5 * 1 day
    );
    const refreshTokenOptions: SetCookieOption = {
      expires: refreshTokenExpiry,
      httpOnly: process.env.NODE_ENV === "production", // Cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Helps prevent CSRF attacks
    };
    // set access token
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Server Error!" });
  }
};
