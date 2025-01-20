// import Link from "next/link";
import style from "./page.module.scss";

const page = () => {
  return (
    <>
      <div className={style.homePage}>
        <header className={style.header}>
          <h1>Passport JS + JWT + OAuth 2.0 Authentication</h1>
          <p>Handle Access Token and Refresh Token on server</p>
        </header>
      </div>
    </>
  );
};

export default page;
