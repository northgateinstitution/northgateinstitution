'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  Menu,
  X,
  School,
  Search,
  User,
  Home,
  BookOpen,
  Calendar,
  Bell,
} from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: '🏠 Home', href: '/' },
    {
      name: '🌟 About',
      dropdown: [
        { name: 'Introduction', href: '/about/introduction' },
        { name: "Directors Message", href: '/about/directorMsg' },
        { name: 'Vision & Mission', href: '/about/vision' },
        { name: "Principal's Desk", href: '/about/principal' },
        { name: 'Faculty & Staff', href: '/about/faculty' },
      ],
    },
    {
      name: '📚 Academics',
      dropdown: [
        { name: 'Curriculum', href: '/academics/curriculum' },
        { name: 'Departments & Subjects', href: '/academics/departments' },
        { name: 'Digital Learning', href: '/academics/digital-learning' },
        { name: 'Academic Calendar', href: '/academics/calendar' },
        { name: 'Examination & Results', href: '/academics/results' },
      ],
    },
    {
      name: '🎭 Student',
      dropdown: [
        { name: 'Clubs & Societies', href: '/student-life/clubs' },
        { name: 'Cultural Programs', href: '/student-life/cultural' },
        { name: 'Sports & Fitness', href: '/student-life/sports' },
        { name: 'Success Stories', href: '/student-life/alumni' },
      ],
    },
    {
      name: '📅 Events',
      dropdown: [
        { name: 'Upcoming Events', href: '/events/upcoming' },
        { name: 'Annual Functions', href: '/events/annual' },
        { name: 'Competitions', href: '/events/competitions' },
        { name: 'Past Events', href: '/events/gallery' },
      ],
    },
    { name: '📢 Notice', href: '/notices' },
    { name: '🤝 Admission', href: '/admission' },
    { name: '📞 Contact', href: '/contact' },
  ]

  const handleLinkClick = () => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  return (
    <>
      {/* Compact Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600'
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center py-2 sm:py-2.5">
            {/* Compact Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-2.5"
              onClick={handleLinkClick}
            >
              <div
                className={`flex items-center justify-center rounded-lg shadow-sm transition-all 
                  w-8 h-8 sm:w-9 sm:h-9
                  ${
                    isScrolled
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'bg-white'
                  }`}
              >
                <School
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    isScrolled ? 'text-white' : 'text-blue-600'
                  }`}
                />
              </div>
              <div className="leading-tight">
                <span
                  className={`font-bold text-sm sm:text-base lg:text-lg
                    ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                >
                  Northgate Institution
                </span>
                <p
                  className={`text-xs hidden sm:block
                    ${isScrolled ? 'text-gray-500' : 'text-white/80'}`}
                >
                  Since 2025
                </p>
              </div>
            </Link>

            {/* Desktop Menu - Compact */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.name ? null : item.name
                        )
                      }
                      className={`px-2 py-1.5 rounded-md text-sm font-medium flex items-center transition-all ${
                          isScrolled
                            ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`ml-1 w-3.5 h-3.5 transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`px-2 py-1.5 rounded-md text-sm font-medium transition-all ${
                          isScrolled
                            ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                            : 'text-white/90 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Compact Dropdown */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Compact Right Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                className={`p-1.5 rounded-full transition ${
                  isScrolled
                    ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <Link href="/login" onClick={handleLinkClick}>
                <button
                  className={`px-2 py-1.5 rounded-md text-sm font-medium flex items-center space-x-1 transition ${
                      isScrolled
                        ? 'text-gray-700 bg-blue-50 hover:bg-blue-100 border border-blue-100'
                        : 'text-white bg-white/10 hover:bg-white/20'
                    }`}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Portal</span>
                </button>
              </Link>
              
              {/* Mobile Toggle - Compact */}
              <button
                className={`lg:hidden p-1.5 rounded-md ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-blue-50'
                    : 'text-white hover:bg-white/10'
                }`}
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen)
                  setActiveDropdown(null)
                }}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Compact Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-2 w-full rounded-lg bg-white shadow-md border border-gray-100">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.name ? null : item.name
                          )
                        }
                        className="flex justify-between items-center w-full px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="pl-4 pb-1 bg-gray-50">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600"
                              onClick={handleLinkClick}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium"
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Compact Bottom Nav for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 flex justify-around items-center py-1.5 px-2 lg:hidden z-50">
        <Link
          href="/"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs min-w-0 flex-1"
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span className="truncate">Home</span>
        </Link>
        <Link
          href="/academics"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs min-w-0 flex-1"
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span className="truncate">Study</span>
        </Link>
        <Link
          href="/events"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs min-w-0 flex-1"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span className="truncate">Events</span>
        </Link>
        <Link
          href="/notices"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs min-w-0 flex-1"
        >
          <Bell className="w-4 h-4 mb-0.5" />
          <span className="truncate">Notice</span>
        </Link>
        <Link
          href="/login"
          className="flex flex-col items-center text-gray-600 hover:text-blue-600 text-xs min-w-0 flex-1"
        >
          <User className="w-4 h-4 mb-0.5" />
          <span className="truncate">Portal</span>
        </Link>
      </nav>
    </>
  )
}

export default Header