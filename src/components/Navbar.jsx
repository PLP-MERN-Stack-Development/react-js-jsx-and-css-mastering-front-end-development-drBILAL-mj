// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          MyApp
        </Link>

        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/tasks" className="hover:underline">Tasks</Link>
          <Link to="/explorer" className="hover:underline">Explorer</Link>
          <Link to="/about" className="hover:underline">About</Link>
          {/* Add additional links here */}
        </div>
      </div>
    </nav>
  );
}
