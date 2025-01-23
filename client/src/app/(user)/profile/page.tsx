"use client";
// import Image from "next/image";
import React, { useEffect } from "react";
import "./profile.scss";
import { useStore } from "@/store/store";
import axios from "axios";
import Loading from "@/app/loading";

const Page: React.FC = () => {
  const { isLogin, setIsLogin, user, setUser } = useStore();

  const logoutHandler = () => {
    console.log("hiii");
  };

  useEffect(() => {
    if (isLogin === false) {
      const checkLogin = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/user/get-profile`,
            {
              withCredentials: true,
            }
          );
          if (response.data.success) {
            setIsLogin(true);
            setUser(response.data.user);
          }
        } catch (error) {
          console.log(error);
          setIsLogin(false);
        }
      };
      checkLogin();
    } else {
      return;
    }
  }, [setIsLogin, isLogin, setUser]);
  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-user-data">
          {/* <Image
          className="profile-image"
          src="https://avatars.githubusercontent.com/u/104547345?v=4"
          width={500}
          height={500}
          alt="Picture of the author"
        /> */}
          <p>Name : {user.name}</p>
          <p>Email : {user.email}</p>
          <button
            onClick={() => {
              logoutHandler();
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
