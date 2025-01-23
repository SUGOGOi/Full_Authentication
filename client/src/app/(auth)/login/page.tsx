"use client";
import { useState } from "react";
import "./login.scss";
import { toast } from "react-hot-toast";
import axios from "axios";
import { LoginResponse } from "./login";
import { useRouter } from "next/navigation";

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
        router.push("/profile");
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
        <form
          // className={`login-form ${darkMode ? "dark" : ""}`}
          className={`login-form `}
          onSubmit={handleLogin}
        >
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
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="login-spinner"></div> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
