import jwt from "jsonwebtoken";
export const isTokenExpired = (token) => {
    if (!token) {
        return true;
    }
    const decodedToken = jwt.decode(token);
    if (decodedToken && typeof decodedToken !== "string") {
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    }
    else {
        return true;
    }
};
