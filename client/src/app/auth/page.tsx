"use client";

import React, { useState } from "react";
import SignInForm from "../../components/SignIn";
import SignUpForm from "../../components/SignUp";
// import ThemeToggle from "../../components/ThemeToggle";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        {/* <div className="flex justify-end mb-4"><ThemeToggle /></div> */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-8">
          <button
            className={`flex-1 py-2 rounded-md transition-all duration-300 ${
              isLogin
                ? "bg-white dark:bg-gray-800 shadow-md text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 rounded-md transition-all duration-300 ${
              !isLogin
                ? "bg-white dark:bg-gray-800 shadow-md text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default AuthPage;
