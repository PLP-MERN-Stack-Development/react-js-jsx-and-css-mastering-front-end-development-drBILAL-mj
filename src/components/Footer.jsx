// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} MyApp. All rights reserved.</div>
        <div className="space-x-4 text-sm">
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/privacy" className="hover:underline">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
