"use client";
import Link from "next/link";
import "./Navbar.scss";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useStore } from "@/store/store";
import axios from "axios";
// import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const Navbar: React.FC = () => {
  const { isAuth, setIsAuth, setCheckApi } = useStore();

  useEffect(() => {
    const authCookie = Cookies.get("is_auth");
    if (authCookie === "true") {
      setIsAuth(true);
    }
  }, [setIsAuth]);

  useEffect(() => {
    const checkApiFun = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setCheckApi(true);
      }
    };

    checkApiFun();
  }, [setCheckApi]);
  return (
    <>
      {/* {isAuth === null && <LoadingIndicator />} */}
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
                <Link href="/user/profile" className="navbar__link">
                  Profile
                </Link>
              </div>
            ) : (
              <>
                <div className="navbar__item">
                  <Link href="/auth/login" className="navbar__link">
                    Login
                  </Link>
                </div>
                <div className="navbar__item">
                  <Link href="/auth/register" className="navbar__link">
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
