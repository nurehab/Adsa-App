import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import ScrollToTop from "../Scroll/ScrollToTop";

export default function Layout() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <ScrollToTop />
        <Navbar />
        <main className="grow pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
