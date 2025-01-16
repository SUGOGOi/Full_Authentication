import { Request, Response, NextFunction } from "express";

export const setAuthHeader = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const accessToken = req.cookies.accessToken;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "Server Error!" });
  }
};
