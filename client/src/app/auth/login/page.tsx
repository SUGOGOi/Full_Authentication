"use client";
import { useState } from "react";
import "./login.scss";
import { toast } from "react-hot-toast";
import axios from "axios";
import { LoginResponse } from "./login";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email an password are required");
    }

    try {
      setIsLoading(true);

      const response = await axios.post<LoginResponse>(
        `http://localhost:4000/api/user/login`,
        { email: email, password },
        {
          withCredentials: true, // Include credentials (cookies, HTTP auth)
        }
      );

      if (response.data.success) {
        toast.success(`${response.data.message}`);
        router.push("/user/profile");
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
      setPassword("");
      setEmail("");
    }
  };
  return (
    <div className="container">
      <div className="loginContainer">
        <form className="login-form" onSubmit={handleLogin}>
          <h2 className="login-title">Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link
            href="/auth/forgot-password"
            className="login-link forgot-password"
          >
            Forgot Password?
          </Link>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="login-spinner"></div> : "Login"}
          </button>
          <div className="login-footer">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="login-link">
                Create New Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
