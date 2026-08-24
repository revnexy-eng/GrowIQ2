import React, { useState } from 'react'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('users')
  const users = JSON.parse(localStorage.getItem('mocks_users') || '[]')
  const purchases = JSON.parse(localStorage.getItem('mocks_purchases') || '[]')
  const events = JSON.parse(localStorage.getItem('mocks_events') || '[]')

  const defaultAdmin = { email: 'admin@mops.com', role: 'admin', name: 'Admin User' }
  const allUsers = [defaultAdmin, ...users]

  const eventCounts = events.reduce((acc, e) => {
    acc[e.event] = (acc[e.event] || 0) + 1
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Admin Console</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Platform overview, user accounts, and telemetry analytics
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Users</div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{allUsers.length}</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Purchases</div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{purchases.length}</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Logged Events</div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">{events.length}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 border-b border-slate-200 dark:border-slate-800">
        <nav className="-mb-px flex gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-4 border-b-2 transition-colors ${
              activeTab === 'users'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            Users ({allUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('purchases')}
            className={`pb-4 border-b-2 transition-colors ${
              activeTab === 'purchases'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            Purchases ({purchases.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-4 border-b-2 transition-colors ${
              activeTab === 'events'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            Event Telemetry
          </button>
        </nav>
      </div>

      {/* Tab Panels */}
      <div className="mt-6">
        {activeTab === 'users' && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allUsers.map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{u.name || 'System Admin'}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'purchases' && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3">Purchase ID</th>
                  <th className="px-6 py-3">Purchaser</th>
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {purchases.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                      No purchases logged yet.
                    </td>
                  </tr>
                ) : (
                  purchases.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="px-6 py-4 font-mono text-xs">{p.id}</td>
                      <td className="px-6 py-4">{p.purchaser}</td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{p.planName}</td>
                      <td className="px-6 py-4">{p.price ? `$${p.price}` : 'Free'}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {new Date(p.ts).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Event Frequency</h3>
              <div className="space-y-3">
                {Object.keys(eventCounts).length === 0 ? (
                  <p className="text-sm text-slate-500">No events captured.</p>
                ) : (
                  Object.entries(eventCounts).map(([evt, count]) => (
                    <div key={evt} className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-mono text-purple-600 dark:text-purple-400">{evt}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{count}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Raw Telemetry Log</h3>
              <div className="h-64 overflow-y-auto rounded-lg bg-slate-950 p-4 font-mono text-xs text-emerald-400">
                <pre>{JSON.stringify(events, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}