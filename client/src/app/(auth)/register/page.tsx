"use client";
import React, { useState } from "react";
import "./register.scss";
import { toast } from "react-hot-toast";
import { RegisterPayload, registerUser } from "./register";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const hangleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ensure all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setIsLoading(true);

      const payload: RegisterPayload = {
        name,
        email,
        password,
        confirm_password: confirmPassword,
      };
      const response = await registerUser(payload);

      if (response.success) {
        toast.success(`${response.message}`);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        router.push("/email-verification");
      } else {
        console.log(response);
        toast.error(response.error || "Registration failed.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Server Error!");
        }
        console.log(error);
        setIsLoading(false);
        setName("");
        setPassword("");
        setEmail("");
        setConfirmPassword("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerContainer">
      <div className="register-form">
        <form onSubmit={hangleRegister}>
          <div className="register-form-group">
            <h2 className="register-title">Register</h2>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? <div className="register-spinner"></div> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
