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
  //   console.log(process.env.BACKEND_URL);
  const response = await axios.post<RegisterResponse>(
    `http://localhost:4000/api/user/register`,
    payload,
    {
      withCredentials: true, // Include credentials (cookies, HTTP auth)
    }
  );
  return response.data;
};
