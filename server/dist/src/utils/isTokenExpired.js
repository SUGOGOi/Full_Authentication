import jwt from "jsonwebtoken";
export const isTokenExpired = (token) => {
    if (!token) {
        return true; // Token is invalid or missing
    }
    // Decode the token without verifying
    const decodedToken = jwt.decode(token);
    // Ensure the token is decoded and has the `exp` field
    if (decodedToken && typeof decodedToken.exp === "number") {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return decodedToken.exp < currentTime; // Check if the token is expired
    }
    return true; // If decoding fails or `exp` is missing, consider the token expired
};
