import { isTokenExpired } from "../utils/isTokenExpired.js";
export const setAuthHeader = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(500).json({ success: false, error: "Unauthorized" });
        }
        if (accessToken || !isTokenExpired(accessToken)) {
            req.headers["authorization"] = `Bearer ${accessToken}`;
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Server Error!" });
    }
};
