import React, { createContext, useContext, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Checkout from './pages/Checkout'
import Member from './pages/Member'
import Admin from './pages/Admin'
import ThankYou from './pages/ThankYou'
import NotFound from './pages/NotFound'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/member" replace />
  }
  return children
}

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mopsUser') || 'null')
    } catch {
      return null
    }
  })

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('mopsUser', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mopsUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 antialiased">
        <Navbar />
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/member"
              element={
                <ProtectedRoute>
                  <Member />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  )
}
