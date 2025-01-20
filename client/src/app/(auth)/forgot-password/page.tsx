//email field
"use client";
import React, { useState } from "react";
import "./forgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending a reset password link
    setMessage("If this email is registered, a reset link will be sent.");
  };
  return (
    <div className="forgot-password">
      <h1 className="forgot-password__title">Forgot Password</h1>
      <p className="forgot-password__description">
        Enter your email address below, and we will send you a link to reset
        your password.
      </p>
      <form onSubmit={handleSubmit} className="forgot-password__form">
        <label htmlFor="email" className="forgot-password__label">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="forgot-password__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="forgot-password__button">
          Send Reset Link
        </button>
      </form>
      {message && <p className="forgot-password__message">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
