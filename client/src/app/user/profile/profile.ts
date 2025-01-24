export interface GetProfileResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    is_verified: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message?: string;
  error?: string;
}
