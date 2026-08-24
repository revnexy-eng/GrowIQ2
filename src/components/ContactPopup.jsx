import React, { useState, useEffect } from 'react'
import { useAuth } from '../App'

export default function ContactPopup({ isOpen, onClose }) {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Pre-fill user data when modal opens or user logs in
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }))
    }
  }, [user, isOpen])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errorMsg) setErrorMsg('')
  }

  const validEmail = (email) => /^\S+@\S+\.\S+$/.test(email)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!user) {
      setErrorMsg('Please log in or sign up before submitting a request.')
      return
    }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg('Please complete all required fields.')
      return
    }
    if (!validEmail(form.email)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setSubmitting(true)

    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('growiq_messages') || '[]')
      const item = {
        id: 'm_' + Date.now(),
        name: form.name,
        email: form.email,
        message: form.message,
        ts: Date.now(),
      }
      existing.push(item)
      localStorage.setItem('growiq_messages', JSON.stringify(existing))

      // Google Tag Manager / Analytics Event
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'lead_submit',
        form_name: 'request_demo',
        is_logged_in: true,
      })

      setSubmitting(false)
      setShowThanks(true)

      setTimeout(() => {
        setShowThanks(false)
        setForm({ name: '', email: '', message: '' })
        onClose()
      }, 1800)
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:items-end sm:justify-end">
      {/* Dim Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div
        className="relative z-10 w-full max-w-md animate-growiq-slide rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Request a Demo
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        {showThanks ? (
          <div className="my-8 rounded-xl bg-emerald-50 p-6 text-center text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <p className="text-lg font-semibold">Thank you!</p>
            <p className="text-sm">We've received your message and will reach out shortly.</p>
          </div>
        ) : (
          <div>
            {!user && (
              <div className="mb-4 rounded-lg bg-amber-50 p-3 text-xs font-medium text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                ⚠️ You must be logged in to request a demo. Please log in or create an account first.
              </div>
            )}

            {errorMsg && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-900">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                  placeholder="Jane Doe"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                  placeholder="jane@company.com"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  How can we help?
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="h-28 w-full resize-none px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-slate-800 dark:border-slate-700"
                  placeholder="Tell us about your team size and goals..."
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                >
                  {submitting ? 'Sending...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}