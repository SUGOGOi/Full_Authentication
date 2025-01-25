"use client";
import React, { useState, useEffect } from "react";
import "./emailVerification.scss";
import { useStore } from "@/store/store";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  EmailVerifying,
  ResendEmailVerificationOTPResponse,
} from "./emailVerification";
import { useRouter } from "next/navigation";

const EmailVerification = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isResending, setIsResending] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(20); // Timer in seconds
  const { user } = useStore();
  const router = useRouter();

  console.log(user);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!user?.email && !email) {
      toast.error("Email required!");
      return;
    }
    try {
      setIsVerifying(true);

      const response = await axios.put<EmailVerifying>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/email-verification`,
        { email: user!.email || email, otp },
        {
          withCredentials: true, // Include credentials (cookies, HTTP auth)
        }
      );

      if (response.data.success) {
        toast.success(`${response.data.message}`);
        router.push("/login");
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
      setIsVerifying(false);
      setOtp("");
      setEmail("");
    }
  };

  const handleResendOtp = async (): Promise<void> => {
    try {
      setIsResending(true);
      const response = await axios.put<ResendEmailVerificationOTPResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/resend-registration-otp`,
        { email: user!.email },
        {
          withCredentials: true, // Include credentials (cookies, HTTP auth)
        }
      );

      if (response.data.success) {
        toast.success(`${response.data.message}`);
        setTimer(20);
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
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown); // Cleanup the interval
    }
  }, [timer]);

  // Format timer in MM:SS
  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="email-verification">
      <form className="email-verification__form" onSubmit={handleSubmit}>
        <h1 className="email-verification__title">Email Verification</h1>
        <p className="email-verification__note">
          OTP will be valid for 10 minutes only.
        </p>

        {user && user.email ? null : (
          <div className="email-verification__field">
            <label htmlFor="email" className="email-verification__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="email-verification__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        <div className="email-verification__field">
          <label htmlFor="otp" className="email-verification__label">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            className="email-verification__input"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="email-verification__button"
          disabled={isVerifying || isResending}
        >
          {isVerifying ? (
            <div className="email-verifying-spinner"></div>
          ) : (
            "Verify"
          )}
        </button>

        {user && user.email ? (
          <>
            <button
              type="button"
              className={`email-verification__resend-button ${
                isVerifying ? "not-allowed-when-verifying" : ""
              }`}
              onClick={handleResendOtp}
              disabled={isResending || timer > 0}
            >
              {isResending ? (
                <div className="email-resending-spinner"></div>
              ) : (
                "Resend OTP"
              )}
            </button>

            {timer > 0 ? (
              <p className="p-resend-otp-text">{`Resend OTP in ${formatTimer(
                timer
              )}`}</p>
            ) : null}
          </>
        ) : (
          <>
            {timer > 0 ? (
              <p className="p-resend-otp-text">{`Resend OTP in ${formatTimer(
                timer
              )}`}</p>
            ) : (
              <p className="p-resend-otp-text">
                Didn&apos;t receive OTP?{" "}
                <Link
                  href="/auth/resend-email-verification-otp"
                  rel="noopener noreferrer"
                >
                  Resend OTP
                </Link>
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default EmailVerification;
