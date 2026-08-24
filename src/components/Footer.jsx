import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-xs text-slate-500 text-center">
          © {new Date().getFullYear()} GrowIQ. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
