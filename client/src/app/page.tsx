import Link from "next/link";
import style from "./page.module.scss";

const page = () => {
  return (
    <div className={style.homePage}>
      <header className={style.header}>
        <h1>Welcome to Our Authentication System</h1>
        <p>Your secure gateway to modern authentication methods.</p>
      </header>
      <div className={style.authActions}>
        <Link
          className={style.authBtnLogin}
          href={`${process.env.FRONTEND_URL}/login`}
        >
          Log In
        </Link>
        <Link
          className={style.authBtnSignup}
          href={`${process.env.FRONTEND_URL}/register`}
        >
          Sign Up
        </Link>
      </div>

      <footer className={style.footer}>
        <p>&copy; 2025 AuthSystem. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default page;
