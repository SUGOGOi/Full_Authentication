import { isTokenExpired } from "../utils/isTokenExpired.js";
import { refreshAccessToken } from "../utils/refreshAccessToken.js";
import { setTokenCookies } from "../utils/setTokenCookies.js";
export const accessTokenAutoRefresh = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = req.cookies;
        console.log(accessToken, refreshToken);
        if (accessToken && !isTokenExpired(accessToken)) {
            req.headers["authorization"] = `Bearer ${accessToken}`;
        }
        if (!accessToken && !refreshToken) {
            return res.status(500).json({ success: false, error: "Unauthorized" });
        }
        if (!accessToken) {
            //get new access token using refresh token
            const { newAccessToken, newRefreshToken, error } = await refreshAccessToken(req, res);
            if (error) {
                return res.status(error.statusCode).json({
                    success: false,
                    error: error.errorMessage,
                });
            }
            // set new access + refresh token to cookie
            setTokenCookies(res, newAccessToken, newRefreshToken);
            req.headers["authorization"] = `Bearer ${newAccessToken}`;
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Server Error!" });
    }
};
