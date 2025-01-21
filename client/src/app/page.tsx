// import Link from "next/link";
// import Navbar from "@/components/Navbar/Navbar";
import style from "./page.module.scss";
// import Footer from "@/components/Footer/Footer";

const page = () => {
  return (
    // <div className={style.homePage}>
    //   <Navbar />
    <div className={style.homeContainer}>
      <header className={style.header}>
        <h1>Passport JS + JWT + OAuth 2.0 Authentication</h1>
        <p>Handle Access Token and Refresh Token on server</p>
        <p>
          Created by Sumsum Gogoi. Check out the source code on GitHub:{" "}
          <a
            href="https://github.com/SUGOGOi/Full_Authentication"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </a>
        </p>
        <p>
          Visit my portfolio:{" "}
          <a
            href="https://sumsum-gogoi.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio
          </a>
        </p>
      </header>
    </div>

    //   <Footer />
    // </div>
  );
};

export default page;
