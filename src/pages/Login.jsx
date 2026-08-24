import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../App'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const next = params.get('next')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const users = JSON.parse(localStorage.getItem('mocks_users') || '[]')
    const defaultAdmin = {
      email: 'admin@mops.com',
      password: 'admin123',
      role: 'admin',
      name: 'Admin User',
    }
    const allUsers = [defaultAdmin, ...users]

    const foundUser = allUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    )

    if (!foundUser) {
      setError('Invalid email or password credentials.')
      return
    }

    const userData = { email: foundUser.email, role: foundUser.role, name: foundUser.name }
    login(userData)

    // Analytics Tracking
    const evt = { event: 'login', email: foundUser.email, ts: Date.now() }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(evt)
    const events = JSON.parse(localStorage.getItem('mocks_events') || '[]')
    events.push(evt)
    localStorage.setItem('mocks_events', JSON.stringify(events))

    if (next) {
      navigate(decodeURIComponent(next))
    } else {
      navigate(foundUser.role === 'admin' ? '/admin' : '/member')
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Log in to access your dashboard</p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mops.com"
              className="w-full px-3 py-2.5 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <button type="submit" className="w-full btn btn-primary mt-2">
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to={`/signup${next ? `?next=${next}` : ''}`} className="font-semibold text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}