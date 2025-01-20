"use client";
import Image from "next/image";
import React from "react";
import "./profile.scss";

const Page: React.FC = () => {
  const userName: string = "Sumsum Gogoi";
  const userEmail: string = "sumsumgogoi51@gmail.com";

  const logoutHandler = () => {
    console.log("hiii");
  };
  return (
    <div className="profile-container">
      <div className="profile-user-data">
        <Image
          className="profile-image"
          src="https://avatars.githubusercontent.com/u/104547345?v=4"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <p>Name : {userName}</p>
        <p>Email : {userEmail}</p>
        <button
          onClick={() => {
            logoutHandler;
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Page;
