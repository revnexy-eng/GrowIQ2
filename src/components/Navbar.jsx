import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'

// 1. Import your image directly from the assets folder
import logoImg from '../assets/logo.png'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight text-white">
          {/* 2. Pass the imported variable to the src attribute */}
          <img 
            src={logoImg} 
            alt="GrowIQ Logo" 
            className="h-8 w-8 object-contain" 
          />
          GrowIQ
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition">
            Home
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition">
            Pricing
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to={user.role === 'admin' ? '/admin' : '/member'}
                className="text-sm font-medium text-purple-400 hover:text-purple-300 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-white transition px-3 py-1.5"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-purple-500 transition"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="border-b border-slate-800 bg-slate-900 px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-white"
            >
              Home
            </Link>
            <Link
              to="/pricing"
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-slate-300 hover:text-white"
            >
              Pricing
            </Link>
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/member'}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium text-purple-400"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setMenuOpen(false)
                  }}
                  className="text-left text-base font-medium text-slate-300 hover:text-white"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border border-slate-700 py-2 text-center text-sm font-medium text-slate-300"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-purple-600 py-2 text-center text-sm font-semibold text-white"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
