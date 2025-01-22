import axios from "axios";

export interface EmailVerificationPayload {
  email: string;
  otp: string;
}

export interface EmailVerificationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface ResendEmailVerificationOTPResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Email verification otp API call
export const emailVerificationOtpAPICall = async (
  payload: EmailVerificationPayload
): Promise<EmailVerificationResponse> => {
  //   console.log(process.env.BACKEND_URL);
  const response = await axios.post<EmailVerificationResponse>(
    `http://localhost:4000/api/user/email-verification`,
    payload,
    {
      withCredentials: true, // Include credentials (cookies, HTTP auth)
    }
  );
  return response.data;
};
