import jwt from "jsonwebtoken";
export const generateAccessToken = (user, req) => {
    console.log("Generating access tokens...");
    const payload = { _id: user._id, role: user.role };
    const accessToken = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    return accessToken;
};
