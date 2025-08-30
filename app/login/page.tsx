'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, BookOpen, Sparkles, ArrowRight, Shield } from 'lucide-react'
import { createSupabaseClient } from '@/lib/supabase'
import toast from 'react-hot-toast'
import Layout from '@/components/Layout'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  const router = useRouter()
  const supabase = createSupabaseClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      // Get user profile to determine role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profileError) {
        toast.error('Error fetching user profile')
        return
      }

      // Redirect based on role
      if (profile.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/student')
      }
      
      toast.success('Login successful!')
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout> 
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Light Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/40 via-pink-100/40 to-cyan-100/40 animate-gradient-x"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-25 animate-pulse"></div>
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-20 w-32 h-32 border border-purple-300/40 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-indigo-300/40 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-pink-300/40 to-purple-300/40 rotate-12 animate-pulse"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Header with Animation */}
          <div className="text-center mb-8 transform animate-fade-in-up">
  <Link
    href="/"
    className="inline-flex items-center space-x-3 text-white hover:text-purple-200 transition-all duration-300 hover:scale-105 group"
  >
    <div className="relative">
      <BookOpen className="h-10 w-10 transform group-hover:rotate-12 transition-transform duration-300" />
      <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-yellow-400 animate-ping" />
    </div>
    <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
      Nort Gate Instituion
    </span>
  </Link>

  <div className="mt-8 space-y-2">
    <p className="text-lg bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
      Sign in to unlock your learning journey
    </p>
  </div>
</div>


          {/* Login Form with Glassmorphism */}
          <div className="backdrop-blur-xl bg-white/70 rounded-3xl border border-white/60 shadow-2xl p-8 transform animate-fade-in-up animate-delay-200">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-4 bg-white/50 backdrop-blur-sm border-2 rounded-2xl text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:bg-white/80 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 ${
                      focusedField === 'email' ? 'border-purple-400 bg-white/80 shadow-lg shadow-purple-400/25' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-200/40 to-pink-200/40 -z-10 blur-xl transition-opacity duration-300 ${
                    focusedField === 'email' ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative group">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className={`w-full px-4 py-4 pr-12 bg-white/50 backdrop-blur-sm border-2 rounded-2xl text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:bg-white/80 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 ${
                      focusedField === 'password' ? 'border-purple-400 bg-white/80 shadow-lg shadow-purple-400/25' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:scale-110"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-200/40 to-pink-200/40 -z-10 blur-xl transition-opacity duration-300 ${
                    focusedField === 'password' ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 group-hover:space-x-3 transition-all duration-300">
                      <Shield className="h-5 w-5" />
                      <span>Login</span>
                      <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

         

          {/* Back to Home */}
          <div className="mt-8 text-center transform animate-fade-in-up animate-delay-500">
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 group"
            >
              <ArrowRight className="h-4 w-4 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: 0% 50%; }
          50% { background-size: 200% 200%; background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-3deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-gradient-x { animation: gradient-x 15s ease infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-400 { animation-delay: 0.4s; }
        .animate-delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
    </Layout>
  )
}