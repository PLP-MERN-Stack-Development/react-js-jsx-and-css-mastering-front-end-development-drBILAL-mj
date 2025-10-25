// src/layout/Layout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Layout wraps page content with Navbar and Footer.
 * Use <Layout> ... page contents ... </Layout>
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
