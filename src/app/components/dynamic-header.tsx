"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DynamicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-xl 
      ${
        isScrolled
          ? "bg-slate-900/80 shadow-lg"
          : "bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950"
      }`}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl 
            bg-gradient-to-br from-blue-500/20 to-cyan-500/20 
            backdrop-blur-sm border border-slate-700"
          >
            <svg className="w-6 h-6 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 text-transparent bg-clip-text">
            THE SAVITIN
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#home"
            className={`font-medium transition-all hover:opacity-80 ${
              pathname === "#home" ? "text-cyan-300" : "text-slate-300"
            }`}
          >
            HOME
          </Link>

          <a
            href="#category-section"
            className={`font-medium transition-all hover:opacity-80 ${
              pathname === "/#category-section" ? "text-cyan-300" : "text-slate-300"
            }`}
          >
            CATEGORY
          </a>

          <Link
            href="#listing-section"
            className={`font-medium transition-all hover:opacity-80 ${
              pathname === "/#listing-section" ? "text-cyan-300" : "text-slate-300"
            }`}
          >
            LISTING
          </Link>

          <Link
            href="/contact"
            className={`font-medium transition-all hover:opacity-80 ${
              pathname === "/contact" ? "text-cyan-300" : "text-slate-300"
            }`}
          >
            CONTACT US
          </Link>
        </nav>

        {/* Button */}
        <button
          className="flex items-center gap-2 px-6 py-2 rounded-xl font-semibold 
          bg-gradient-to-r from-blue-500 to-cyan-500 text-white 
          hover:shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all"
        >
          <Plus size={20} />
          Add Your Listing
        </button>
      </div>
    </header>
  );
}
