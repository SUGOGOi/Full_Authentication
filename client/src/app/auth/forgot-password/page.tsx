//email field
"use client";
import React, { useState } from "react";
import "./forgotPassword.scss";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface ForgotPasswordResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
    }

    try {
      setIsLoading(true);

      const response = await axios.post<ForgotPasswordResponse>(
        `http://localhost:4000/api/user/reset-password-link`,
        { email },
        {
          withCredentials: true, // Include credentials (cookies, HTTP auth)
        }
      );

      if (response.data.success) {
        toast.success(`${response.data.message}`);
        router.push("/");
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
      setEmail("");
    }
  };
  return (
    <div className="forgot-password-page">
      <h1 className="forgot-password-page__title">Forgot Password</h1>
      <p className="forgot-password-page__description">
        Enter your email address below, and we will send you a link to reset
        your password.
      </p>
      <form onSubmit={handleSubmit} className="forgot-password-page__form">
        <label htmlFor="email" className="forgot-password-page__label">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="forgot-password-page__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="forgot-password-page__button"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="forgot-password-page-spinner"></div>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
