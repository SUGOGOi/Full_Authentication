"use client";
import React, { useState } from "react";
import "./emailVerification.scss";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("OTP:", otp);
    // Add your verification logic here
  };
  return (
    <div className="email-verification">
      <form className="email-verification__form" onSubmit={handleSubmit}>
        <h1 className="email-verification__title">Email Verification</h1>

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

        <button type="submit" className="email-verification__button">
          Verify
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
