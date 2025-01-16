export const setAuthHeader = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Server Error!" });
    }
};
