import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  const handleHeroCTA = (ctaType, path) => {
    const evt = {
      event: 'cta_click',
      cta: ctaType,
      page: window.location.pathname,
      ts: Date.now(),
    }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(evt)

    const events = JSON.parse(localStorage.getItem('mocks_events') || '[]')
    events.push(evt)
    localStorage.setItem('mocks_events', JSON.stringify(events))

    navigate(path)
  }

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-900/10 via-slate-900/0 to-transparent pt-12 pb-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
            🚀 Introducing GrowIQ Marketing Operations 2.0
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
            Scale your marketing ops with data-driven precision
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            GrowIQ integrates seamlessly with GTM, automated funnel analytics, and subscription workflows so you can scale conversions without engineering friction.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleHeroCTA('hero_get_started', '/signup?source=hero')}
              className="btn btn-primary text-base px-8 py-3.5"
            >
              Get Started Free
            </button>
            <button
              onClick={() => handleHeroCTA('hero_pricing', '/pricing')}
              className="btn border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-base px-8 py-3.5"
            >
              Explore Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Built for modern growth teams</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Everything you need to capture, route, and optimize leads.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-600/10 text-purple-600 font-bold mb-4">
              📊
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">GTM Ready Analytics</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Pre-built event tracking triggers out of the box so you never miss custom conversion goal metrics.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600 font-bold mb-4">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Frictionless Flow</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Optimize visitor paths with integrated request modals, instant logins, and checkout routing.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-600 font-bold mb-4">
              🔒
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Protected Admin Controls</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Role-based user permissions keep customer dashboards and administrative backend controls secure.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}