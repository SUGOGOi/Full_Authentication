import axios from "axios";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: {
    _id: string;
    email: string;
  };
  error?: string;
}

// Register user API call
export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  //   console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  const response = await axios.post<RegisterResponse>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`,
    payload,
    {
      withCredentials: true, // Include credentials (cookies, HTTP auth)
    }
  );
  return response.data;
};
