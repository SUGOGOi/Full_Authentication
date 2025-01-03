import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};
