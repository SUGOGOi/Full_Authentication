"use client";
import React, { useState } from "react";
import "./resetPassword.scss";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export interface ResetPasswordResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams<{ id: string; token: string }>();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post<ResetPasswordResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/reset-password/${params.id}/${params.token}`,
        { newPassword, newConfirmPassword: confirmPassword },
        {
          withCredentials: true, // Include credentials (cookies, HTTP auth)
        }
      );

      if (response.data.success) {
        toast.success(`${response.data.message}`);
        router.push("/auth/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Server Error!");
        }
      }
    } finally {
      setIsLoading(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <div className="reset-password">
      <form className="reset-password__form" onSubmit={handleSubmit}>
        <h2 className="reset-password__header">Reset Password</h2>
        <div className="reset-password__field">
          <label htmlFor="newPassword" className="reset-password__label">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="reset-password__input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="reset-password__field">
          <label htmlFor="confirmPassword" className="reset-password__label">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="reset-password__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <p className="reset-password__note">
          This link will be valid for 5 minutes only.
        </p>
        <button
          type="submit"
          className="reset-password__button"
          disabled={isLoading}
        >
          {isLoading ? <div className="reset-password-spinner"></div> : "Reset"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
