import React from 'react'
import { useNavigate } from 'react-router-dom'

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$0',
    popular: false,
    description: 'Perfect for exploring core features and initial testing.',
    features: ['Up to 1,000 monthly trackable events', 'Standard Contact Form Modal', 'Community Support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49/mo',
    popular: true,
    description: 'Ideal for scaling startups and growing marketing teams.',
    features: ['Unlimited trackable events', 'Full GTM Event Layer Integration', 'Member Dashboard Access', 'Priority Support'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$149/mo',
    popular: false,
    description: 'Dedicated infrastructure, custom SLAs, and administrative tools.',
    features: ['Role-Based Admin Access', 'Custom Webhook Destinations', 'Dedicated Account Manager', '24/7 Phone & Email Support'],
  },
]

export default function Pricing() {
  const navigate = useNavigate()

  const handleCTA = (planId) => {
    const evt = {
      event: 'cta_click',
      cta: 'choose_plan',
      plan: planId,
      page: window.location.pathname,
      ts: Date.now(),
    }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(evt)

    const events = JSON.parse(localStorage.getItem('mocks_events') || '[]')
    events.push(evt)
    localStorage.setItem('mocks_events', JSON.stringify(events))

    navigate(`/checkout?plan=${encodeURIComponent(planId)}`)
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Flexible plans for teams of all sizes
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Choose the plan that fits your current growth goals. Upgrade or cancel anytime.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col justify-between rounded-2xl border p-8 bg-white dark:bg-slate-900 shadow-sm transition-transform hover:-translate-y-1 ${
                p.popular
                  ? 'border-purple-600 ring-2 ring-purple-600 dark:border-purple-500'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{p.name}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{p.description}</p>
                <div className="mt-6 text-4xl font-extrabold text-slate-900 dark:text-white">{p.price}</div>

                <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  {p.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-purple-600 font-bold">✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => handleCTA(p.id)}
                  className={`w-full btn ${p.popular ? 'btn-primary' : 'border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  Select {p.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}