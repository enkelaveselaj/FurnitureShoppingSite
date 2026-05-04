"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useSession, signOut } from "next-auth/react";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  const { data: session, status } = useSession();
  const cart = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartState = cart?.state;

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
            href="/products" 
            className="hover:text-[var(--accent)] transition-all duration-300 relative group"
          >
            Catalogue
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

        {/* Cart & Auth - Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link 
            href="/cart"
            className="relative p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartState?.itemCount && cartState.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--dark)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartState.itemCount > 99 ? '99+' : cartState.itemCount}
              </span>
            )}
          </Link>
          
          {/* Authentication Buttons */}
          {status === "loading" ? (
            <div className="w-20 h-8 bg-white/20 rounded animate-pulse"></div>
          ) : session ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center">
                  <span className="text-[var(--dark)] font-semibold text-sm">
                    {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium hidden xl:block">
                  {session.user?.name}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-sm hover:text-[var(--accent)] transition-colors duration-200 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="text-sm hover:text-[var(--accent)] transition-colors duration-200 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--dark)] font-semibold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
              >
                Register
              </Link>
            </div>
          )}
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
              href="/products" 
              className="block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Catalogue
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
            
            {/* Cart Link */}
            <Link 
              href="/cart" 
              className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Shopping Cart</span>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartState?.itemCount && cartState.itemCount > 0 && (
                  <span className="bg-[var(--accent)] text-[var(--dark)] text-xs font-bold rounded-full px-2 py-1">
                    {cartState.itemCount > 99 ? '99+' : cartState.itemCount}
                  </span>
                )}
              </div>
            </Link>
            
            {/* Mobile Authentication Section */}
            {status === "loading" ? (
              <div className="w-full h-10 bg-white/20 rounded animate-pulse mt-4"></div>
            ) : session ? (
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center">
                      <span className="text-[var(--dark)] font-semibold">
                        {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{session.user?.name}</p>
                      <p className="text-sm text-white/70">{session.user?.email}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3 mt-4">
                <Link
                  href="/login"
                  className="w-full block text-center bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full block text-center bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--dark)] font-semibold py-3 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
            
            <button className="w-full bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--dark)] font-semibold py-3 rounded-lg transition-all duration-300 mt-4">
              Shop Now
            </button>
          </div>
        </div>
      )}

    </header>
  );
}