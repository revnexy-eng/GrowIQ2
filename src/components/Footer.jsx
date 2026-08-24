import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-purple-600 text-xs">
            ⚡
          </span>
          GrowIQ
        </div>

        <nav className="flex items-center gap-6 text-sm text-slate-400">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/pricing" className="hover:text-white transition">
            Pricing
          </Link>
          <Link to="/signup" className="hover:text-white transition">
            Sign Up
          </Link>
          <Link to="/login" className="hover:text-white transition">
            Login
          </Link>
        </nav>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} GrowIQ. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
