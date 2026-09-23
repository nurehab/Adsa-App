import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Navbar() {
  let [isOpen, setOpen] = useState(true);

  function toggleBtn() {
    setOpen(!isOpen);
  }

  const closeMenu = () => {
    setOpen(true);
  };

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-500 bg-dark/95 backdrop-blur-xl border-b border-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link
              className="flex items-center gap-3 group"
              to="/"
              onClick={closeMenu}
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                <img
                  src={logo}
                  className="w-full h-full object-cover"
                  alt="Photography Logo"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-linear-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                  عدسة
                </span>
                <span className="text-xs text-orange-400/80 hidden sm:block tracking-wide">
                  عالم التصوير الفوتوغرافي
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center">
              <div className="flex items-center bg-dark-card rounded-full p-1.5 border border-border desktop-nav">
                <NavLink
                  to="/"
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-neutral-400 hover:text-white"
                >
                  الرئيسية
                </NavLink>
                <NavLink
                  to="/blog"
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-neutral-400 hover:text-white"
                >
                  المدونة
                </NavLink>
                <NavLink
                  to="/about"
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-neutral-400 hover:text-white"
                >
                  من نحن
                </NavLink>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button className="p-3 text-neutral-500 hover:text-orange-500 hover:bg-dark-card rounded-xl transition-all duration-300 border border-transparent hover:border-border">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
              <Link to="/blog" className="btn-primary text-sm">
                ابدأ القراءة
              </Link>
            </div>

            <button
              onClick={() => toggleBtn()}
              className="md:hidden p-3 text-neutral-400 hover:text-white hover:bg-dark-card rounded-xl transition-all duration-300 border border-transparent hover:border-border"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"
                  }
                ></path>
              </svg>
            </button>
          </div>

          <div
            className={
              isOpen
                ? "md:hidden overflow-hidden transition-all duration-300 max-h-0"
                : "md:hidden overflow-hidden transition-all duration-300 max-h-80 pb-6"
            }
          >
            <div className="bg-dark-card backdrop-blur-xl rounded-2xl p-4 border border-border">
              <div className="flex flex-col space-y-1 mobile-nav">
                <NavLink
                  to="/"
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-neutral-400 hover:bg-dark-tertiary hover:text-white"
                >
                  الرئيسية
                </NavLink>
                <NavLink
                  to="/blog"
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-neutral-400 hover:bg-dark-tertiary hover:text-white"
                >
                  المدونة
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-neutral-400 hover:bg-dark-tertiary hover:text-white"
                >
                  من نحن
                </NavLink>
                <Link
                  to="/blog"
                  onClick={closeMenu}
                  className="btn-primary text-sm mt-2"
                >
                  ابدأ القراءة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
