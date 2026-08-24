import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../App'

const PLANS = {
  basic: { id: 'basic', name: 'Basic', price: 0 },
  pro: { id: 'pro', name: 'Pro', price: 49 },
  enterprise: { id: 'enterprise', name: 'Enterprise', price: 149 },
}

export default function Checkout() {
  const { user } = useAuth()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const planId = params.get('plan') || 'basic'
  const plan = PLANS[planId] || PLANS.basic
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [card, setCard] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !name) {
      setError('Please specify both name and email.')
      return
    }
    if (plan.price > 0 && card.length < 12) {
      setError('Please provide a valid mock card number.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      const purchases = JSON.parse(localStorage.getItem('mocks_purchases') || '[]')
      const purchase = {
        id: 'p_' + Date.now(),
        plan: plan.id,
        planName: plan.name,
        price: plan.price,
        purchaser: email,
        name,
        ts: Date.now(),
      }
      purchases.push(purchase)
      localStorage.setItem('mocks_purchases', JSON.stringify(purchases))

      const evt = {
        event: 'purchase',
        purchaseId: purchase.id,
        plan: plan.id,
        price: plan.price,
        purchaser: email,
        ts: Date.now(),
      }
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(evt)
      const events = JSON.parse(localStorage.getItem('mocks_events') || '[]')
      events.push(evt)
      localStorage.setItem('mocks_events', JSON.stringify(events))

      setLoading(false)
      navigate(`/thank-you?purchase=${purchase.id}`)
    }, 800)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Checkout</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Complete your subscription setup</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Order Summary</h3>
            <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Selected Plan</span>
                <span className="font-semibold text-slate-900 dark:text-white">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Billing Cycle</span>
                <span className="text-slate-900 dark:text-white">Monthly</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-3 font-bold text-base">
                <span>Total Due</span>
                <span className="text-purple-600 dark:text-purple-400">${plan.price}</span>
              </div>
            </div>
            <Link to="/pricing" className="mt-6 block text-center text-xs font-semibold text-purple-600 hover:underline">
              Change Plan
            </Link>
          </div>
        </div>

        {/* Payment Form */}
        <div className="md:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              {plan.price > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Card Information (Mock)
                  </label>
                  <input
                    required
                    value={card}
                    onChange={(e) => setCard(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full px-3 py-2.5 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full btn btn-primary mt-4">
                {loading ? 'Processing...' : `Confirm & Pay $${plan.price}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}