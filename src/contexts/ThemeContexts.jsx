// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * ThemeContext provides theme toggling across the app.
 * - useTheme() hook exposes { theme, toggleTheme }
 *
 * ✅ Task 3 requirement: useContext for theme management
 */

// const ThemeContext = createContext();
export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // try to restore theme from localStorage for persistence
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
    // apply a class on <html> to allow global tailwind dark styles if desired
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// convenience hook
export function useTheme() {
  return useContext(ThemeContext);
}



// import React, { createContext, useState, useEffect } from 'react'

// export const ThemeContext = createContext()

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(() => {
//     const saved = localStorage.getItem('theme')
//     return saved || 'light'
//   })

//   useEffect(() => {
//     const root = document.documentElement
//     if (theme === 'dark') root.classList.add('dark')
//     else root.classList.remove('dark')
//     localStorage.setItem('theme', theme)
//   }, [theme])

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   )
// }
