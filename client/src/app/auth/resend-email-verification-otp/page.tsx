"use client";
import React, { useState } from "react";
import "./resendEmailVerificationOtp.scss";
import { toast } from "react-hot-toast";
import axios from "axios";
import { ResendEmailVerificationOTPResponse } from "./resendEmailVerificationOtp";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";

const ResendEmailVerificationOTP: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const { setUser } = useStore();
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!email) {
      toast.error("Email required!");
      return;
    }

    try {
      setIsSending(true);
      const response = await axios.put<ResendEmailVerificationOTPResponse>(
        `http://localhost:4000/api/user/resend-registration-otp`,
        { email },
        {
          withCredentials: true, // Include credentials (cookies, HTTP auth)
        }
      );

      if (response.data.success) {
        toast.success(`${response.data.message}`);
        setUser({ email });
        router.push("/auth/email-verification");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Server Error!");
        }
        console.log(error);
      }
    } finally {
      setIsSending(false);
    }
  };
  return (
    <div className="resend-email-verification-otp">
      <form
        className="resend-email-verification-otp__form"
        onSubmit={handleSubmit}
      >
        <h1 className="resend-email-verification-otp__title">
          Resend Email Verification OTP
        </h1>

        <div className="resend-email-verification-otp__field">
          <label
            htmlFor="email"
            className="resend-email-verification-otp__label"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="resend-email-verification-otp__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="resend-email-verification-otp__button"
          disabled={isSending}
        >
          {isSending ? <div className="email-sending-spinner"></div> : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ResendEmailVerificationOTP;
