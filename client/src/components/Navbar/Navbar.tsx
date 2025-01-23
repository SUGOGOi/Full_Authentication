"use client";
import Link from "next/link";
import "./Navbar.scss";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useStore } from "@/store/store";

const Navbar: React.FC = () => {
  const { isAuth, setIsAuth } = useStore();

  useEffect(() => {
    const authCookie = Cookies.get("is_auth");
    if (authCookie === "true") {
      setIsAuth(true);
    }
  }, [setIsAuth]);
  return (
    <nav className="navbar">
      <div className="navbar__list">
        <div className="nav_left">
          <div className="navbar__item">
            <Link href="/" className="navbar__link">
              Home
            </Link>
          </div>
        </div>
        <div className="nav_right">
          {isAuth ? (
            <div className="navbar__item">
              <Link href="/profile" className="navbar__link">
                Profile
              </Link>
            </div>
          ) : (
            <>
              <div className="navbar__item">
                <Link href="/login" className="navbar__link">
                  Login
                </Link>
              </div>
              <div className="navbar__item">
                <Link href="/register" className="navbar__link">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
