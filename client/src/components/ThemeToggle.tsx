"use client";
import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
// import { useTheme } from "../context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const [isDark, toggleTheme] = useState(true);

  return (
    <button
      onClick={() => {
        toggleTheme(!isDark);
      }}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
