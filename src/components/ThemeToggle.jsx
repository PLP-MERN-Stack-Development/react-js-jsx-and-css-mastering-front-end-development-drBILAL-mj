// src/components/ThemeToggle.jsx
import React from "react";
import { useTheme } from "../contexts/ThemeContexts";

/**
 * ThemeToggle: displays current theme and toggles it.
 * - uses Tailwind for layout + dark: variants for colors.
 * - shows micro animation when toggling.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center gap-2 px-3 py-1 rounded-full border transition-shadow duration-200
                 dark:border-gray-700
                 bg-white dark:bg-gray-800
                 shadow-sm hover:shadow-md focus:outline-none focus:ring-2"
    >
      <span className="w-6 h-6 rounded-full flex items-center justify-center
                       bg-yellow-400 dark:bg-yellow-500
                       transform transition-transform duration-300
                       animate-float-up-200">
        {theme === "light" ? "☀️" : "🌙"}
      </span>
      <span className="text-sm hidden sm:inline">{theme === "light" ? "Light" : "Dark"}</span>
    </button>
  );
}


// import React, { useContext } from 'react'
// import { ThemeContext } from '../contexts/ThemeContexts'

// export default function ThemeToggle() {
//   const { theme, setTheme } = useContext(ThemeContext)
//   return (
//     <button
//       onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//       className="px-3 py-1 border rounded-md bg-gray-100 dark:bg-slate-800"
//     >
//       {theme === 'dark' ? 'Light' : 'Dark'}
//     </button>
//   )
// }
