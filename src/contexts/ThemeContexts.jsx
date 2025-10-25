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
