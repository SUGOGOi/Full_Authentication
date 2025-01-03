import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import SocialAuth from "./SocialAuth";

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-colors duration-300"
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <a
            href="#"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            Forgot your password?
          </a>
        </p>
      </form>

      <SocialAuth />
    </div>
  );
};

export default SignInForm;
