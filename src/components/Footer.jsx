import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white text-slate-600 transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="GrowIQ Logo" className="h-7 w-auto" />
            <span className="font-bold text-lg text-slate-900 dark:text-white">GrowIQ</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/signup" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Sign Up
            </Link>
            <Link to="/login" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Login
            </Link>
          </div>

          <div className="text-sm text-slate-500 dark:text-slate-500">
            © {currentYear} GrowIQ — Jan Cedric Gabriola. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}