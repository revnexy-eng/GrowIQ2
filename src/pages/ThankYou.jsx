import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function ThankYou() {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const purchaseId = params.get('purchase')
  const [purchase, setPurchase] = useState(null)

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem('mocks_purchases') || '[]')
    const p = all.find((x) => x.id === purchaseId)
    setPurchase(p || null)

    const evt = { event: 'page_view', page: '/thank-you', purchaseId, ts: Date.now() }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(evt)
    const events = JSON.parse(localStorage.getItem('mocks_events') || '[]')
    events.push(evt)
    localStorage.setItem('mocks_events', JSON.stringify(events))
  }, [purchaseId])

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl text-purple-600 dark:bg-purple-950 dark:text-purple-400">
          🎉
        </div>

        <h1 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">
          Thank you for your order!
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Your request has been processed successfully.
        </p>

        {purchase ? (
          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4 text-left text-sm dark:border-slate-800 dark:bg-slate-800/50 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Order ID</span>
              <span className="font-mono text-slate-900 dark:text-white">{purchase.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Plan</span>
              <span className="font-semibold text-slate-900 dark:text-white">{purchase.planName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Account</span>
              <span className="text-slate-900 dark:text-white">{purchase.purchaser}</span>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-xs text-slate-500">
            A confirmation receipt has been sent to your registered email address.
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/member" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="btn border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}