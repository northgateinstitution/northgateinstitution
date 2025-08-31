'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X, School, Search, User } from 'lucide-react'

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
      name: '🌟 About Us',
      dropdown: [
        { name: "Introduction", href: '/about/introduction' },
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
      name: '🎭 Student Life',
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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
          : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-3'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg shadow-md transition-all ${isScrolled ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-white'
                }`}
            >
              <School
                className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-blue-600'}`}
              />
            </div>
            <div className="leading-tight">
              <span
                className={`font-bold text-lg ${isScrolled ? 'text-gray-800' : 'text-white'
                  }`}
              >
                Northgate Institution
              </span>
              <p
                className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-white/80'
                  }`}
              >
                Since 2025
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === item.name ? null : item.name)
                    }
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all ${isScrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`ml-1 w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isScrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-100 py-2">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            <button
              className={`p-2 rounded-full transition ${isScrolled
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  : 'text-white/90 hover:bg-white/10'
                }`}
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/login" onClick={handleLinkClick}>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition ${isScrolled
                    ? 'text-gray-700 bg-blue-50 hover:bg-blue-100 border border-blue-100'
                    : 'text-white bg-white/10 hover:bg-white/20'
                  }`}
              >
                <User className="w-4 h-4" />
                <span>Portal</span>
              </button>
            </Link>
            {/* Mobile Toggle */}
            <button
              className={`lg:hidden p-2 rounded-md ${isScrolled
                  ? 'text-gray-700 hover:bg-blue-50'
                  : 'text-white hover:bg-white/10'
                }`}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen)
                setActiveDropdown(null)
              }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 rounded-lg bg-white shadow-md border border-gray-100">
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
                      className="flex justify-between items-center w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="pl-6 pb-2 bg-gray-50">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600"
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
                    className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium"
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
  )
}

export default Header