"use client";

import Link from "next/link";
import { useState } from "react";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[var(--dark)] to-[var(--primary)] text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">

      <div className="container-custom flex justify-between items-center py-4 lg:py-6">

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center">
            <span className="text-[var(--dark)] font-bold text-xl">L</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-wide">
            {title}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8 text-sm font-medium">

          <Link 
            href="/" 
            className="hover:text-[var(--accent)] transition-all duration-300 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link 
            href="/about" 
            className="hover:text-[var(--accent)] transition-all duration-300 relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
          </Link>

          <Link 
            href="/contact" 
            className="hover:text-[var(--accent)] transition-all duration-300 relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent)] group-hover:w-full transition-all duration-300"></span>
          </Link>

        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden lg:block">
          <button className="bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--dark)] font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Shop Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[var(--dark)] border-t border-white/10">
          <div className="container-custom py-4 space-y-3">
            <Link 
              href="/" 
              className="block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <button className="w-full bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--dark)] font-semibold py-3 rounded-lg transition-all duration-300 mt-4">
              Shop Now
            </button>
          </div>
        </div>
      )}

    </header>
  );
}