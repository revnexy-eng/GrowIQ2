import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../App'

export default function Signup() {
  const { user, login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const next = params.get('next')
  const plan = params.get('plan')

  useEffect(() => {
    if (user) {
      navigate(next ? decodeURIComponent(next) : '/')
    }
  }, [user, navigate, next])

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!isValidEmail(email)) {
      setError('Please provide a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    const existingUsers = JSON.parse(localStorage.getItem('mocks_users') || '[]')
    if (existingUsers.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      setError('Account already exists with this email. Please log in.')
      return
    }

    const newUser = {
      id: 'u_' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: 'member',
    }

    existingUsers.push(newUser)
    localStorage.setItem('mocks_users', JSON.stringify(existingUsers))

    const userData = { email: newUser.email, role: newUser.role, name: newUser.name }
    login(userData)

    // Analytics Event
    const evt = { event: 'sign_up', email: newUser.email, name: newUser.name, plan: plan || null, ts: Date.now() }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(evt)
    const events = JSON.parse(localStorage.getItem('mocks_events') || '[]')
    events.push(evt)
    localStorage.setItem('mocks_events', JSON.stringify(events))

    if (next) {
      navigate(decodeURIComponent(next))
    } else if (plan) {
      navigate(`/checkout?plan=${encodeURIComponent(plan)}`)
    } else {
      navigate(`/thank-you?lead=${newUser.id}`)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create an account</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Start managing your marketing operations today</p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full px-3 py-2.5 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@company.com"
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
              placeholder="At least 6 characters"
              className="w-full px-3 py-2.5 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-700"
            />
          </div>

          <button type="submit" className="w-full btn btn-primary mt-2">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600 dark:text-slate-400">
          Already have an account?{' '}
          <Link to={`/login${next ? `?next=${next}` : ''}`} className="font-semibold text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}