import React from "react";
import { Github } from "lucide-react";

const SocialAuth: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => console.log("Google sign in")}
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          <span className="text-gray-700 dark:text-gray-200">Google</span>
        </button>

        <button
          className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => console.log("GitHub sign in")}
        >
          <Github className="w-5 h-5 mr-2 text-gray-700 dark:text-gray-200" />
          <span className="text-gray-700 dark:text-gray-200">GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;
