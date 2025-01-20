"use client";
import Link from "next/link";
import "./Navbar.scss";

const Navbar: React.FC = () => {
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
          <div className="navbar__item">
            <Link href="/profile" className="navbar__link">
              Profile
            </Link>
          </div>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
