"use client";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./profile.scss";
import { useStore } from "@/store/store";
import axios from "axios";
import Loading from "@/app/loading";
import { GetProfileResponse, LogoutResponse } from "./profile";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const { isLogin, setIsLogin, user, setUser } = useStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const logoutHandler = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await axios.post<LogoutResponse>(
        `http://localhost:4000/api/user/logout`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        router.push("/");
        toast.success(response.data.message);
      }
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Server Error!");
        }
      }
    } finally {
      setIsLoading(false);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    if (isLogin === false) {
      const checkLogin = async (): Promise<void> => {
        try {
          const response = await axios.get<GetProfileResponse>(
            `http://localhost:4000/api/user/get-profile`,
            {
              withCredentials: true,
            }
          );
          if (response.data.success) {
            setIsLogin(true);
            setUser(response.data.user);
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              toast.error(error.response.data.error);
            } else {
              toast.error("Server Error!");
            }
          }
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
            disabled={isLoading}
          >
            {isLoading ? <div className="logout-spinner"></div> : "Logout"}
          </button>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Page;
