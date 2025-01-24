"use client";
import React, { useState } from "react";
import "./changePassword.scss";
// import Navbar from "@/components/Navbar/Navbar";
// import Footer from "@/components/Footer/Footer";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      console.log("Password changed successfully");
    } else {
      console.error("Passwords do not match");
    }
  };
  return (
    // <div className="changePasswordPage">
    //   <Navbar />
      <div className="change-password">
        <form className="change-password__form" onSubmit={handleSubmit}>
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

          <button type="submit" className="change-password__button">
            Submit
          </button>
        </form>
      </div>
    //   <Footer />
    // </div>
  );
};

export default ChangePassword;
