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

  const handleGoogleLogin = async (): Promise<void> => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`, "_self");
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email an password are required");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
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
          <div className="login-with-others">
            <div className="divider"></div>
            <button
              type="button"
              className="google-login"
              onClick={handleGoogleLogin}
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
              Login with Google
            </button>
          </div>
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
