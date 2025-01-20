"use client";
import React, { useState } from "react";
import "./resetPassword.scss";

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle password reset logic here
    alert("Password reset successful!");
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
        <button type="submit" className="reset-password__button">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
