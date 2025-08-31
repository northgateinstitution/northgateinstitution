'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  BookOpen, 
  User, 
  LogOut, 
  Menu, 
  X, 
  FileText, 
  TrendingUp 
} from 'lucide-react'
import { createSupabaseClient } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface NavbarProps {
  userRole?: 'admin' | 'student'
  userName?: string
}

export default function Navbar({ userRole, userName }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createSupabaseClient()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/login')
      toast.success('Logged out successfully')
    } catch {
      toast.error('Error logging out')
    }
  }

  const getNavLinks = () => {
    if (userRole === 'admin') {
      return [
        { href: '/admin', label: 'Dashboard', icon: TrendingUp },
        { href: '/admin/questions', label: 'Questions', icon: BookOpen },
        { href: '/admin/notices', label: 'Notice', icon: FileText }
      ]
    } else if (userRole === 'student') {
      return [
        { href: '/student', label: 'Dashboard', icon: TrendingUp },
        { href: '/student/solve', label: 'Solve Questions', icon: BookOpen },
        { href: '/student/materials', label: 'Study Materials', icon: FileText }
      ]
    }
    return []
  }

  const navLinks = getNavLinks()

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href={userRole === 'admin' ? '/admin' : '/student'} 
            className="flex items-center space-x-2"
          >
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">North Gate Institution</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {userName && (
              <div className="flex items-center space-x-2 text-gray-700 bg-gray-50 px-3 py-1 rounded-lg">
                <User className="h-5 w-5 text-indigo-600" />
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full capitalize">
                  {userRole}
                </span>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              )
            })}
            {userName && (
              <div className="px-4 py-3 border-t border-gray-200 mt-2">
                <div className="flex items-center space-x-2 text-gray-700 mb-2">
                  <User className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full capitalize">
                    {userRole}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}