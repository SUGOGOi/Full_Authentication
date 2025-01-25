"use client";
import React, { useState } from "react";
import "./register.scss";
import { toast } from "react-hot-toast";
import { RegisterPayload, registerUser } from "./register";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import Link from "next/link";

const Page: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setUser } = useStore();

  const handleGoogleRegister = async (): Promise<void> => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`, "_self");
  };

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
        setUser(response.user!);
        router.push("/auth/email-verification");
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
            <label htmlFor="confirm_password">Confirm Password</label>
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

          <div className="register-with-others">
            <div className="divider"></div>
            <button
              type="button"
              className="google-register"
              onClick={handleGoogleRegister}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-6 h-6 mr-2 text-indigo-500 fill-current"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Register with Google
            </button>
          </div>
          <div className="register-footer">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="register-login-link">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
