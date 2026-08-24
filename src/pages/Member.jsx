import React from 'react'
import { useAuth } from '../App'

export default function Member() {
  const { user } = useAuth()
  const purchases = JSON.parse(localStorage.getItem('mocks_purchases') || '[]').filter(
    (p) => p.purchaser === user?.email
  )

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-xl font-bold text-white">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Welcome back, {user?.name || user?.email}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Role: <span className="font-semibold capitalize">{user?.role || 'Member'}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Account Details & Stats Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Account Profile</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <dt className="text-slate-500 dark:text-slate-400">Name</dt>
              <dd className="font-medium text-slate-900 dark:text-white">{user?.name || 'N/A'}</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <dt className="text-slate-500 dark:text-slate-400">Email</dt>
              <dd className="font-medium text-slate-900 dark:text-white">{user?.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500 dark:text-slate-400">Access Level</dt>
              <dd className="font-medium text-purple-600 dark:text-purple-400 capitalize">{user?.role}</dd>
            </div>
          </dl>
        </div>

        {/* Purchase History */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Subscription History</h3>
          {purchases.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">No active subscriptions or purchases found.</p>
          ) : (
            <div className="space-y-3">
              {purchases.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50"
                >
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{p.planName} Plan</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(p.ts).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {p.price ? `$${p.price}` : 'Free'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}