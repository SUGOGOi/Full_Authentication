"use client";
import { useState } from "react";
import "./login.scss";

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [email, setEmail] = useState(true);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      setPassword("");
    }, 5000);
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
