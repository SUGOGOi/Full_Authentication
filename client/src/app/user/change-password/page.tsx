"use client";
import React, { useState } from "react";
import "./changePassword.scss";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface ChangePasswordResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChangePassword = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post<ChangePasswordResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/change-password`,
        { password: newPassword, confirm_password: confirmNewPassword },
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
      setConfirmNewPassword("");
    }
  };
  return (
    <div className="change-password">
      <form className="change-password__form" onSubmit={handleChangePassword}>
        <h2 className="change-password__title">Change Password</h2>

        <div className="change-password__field">
          <label htmlFor="newPassword" className="change-password__label">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="change-password__input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="change-password__field">
          <label
            htmlFor="confirmNewPassword"
            className="change-password__label"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            className="change-password__input"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="change-password__button"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="change-password-spinner"></div>
          ) : (
            "Change"
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
