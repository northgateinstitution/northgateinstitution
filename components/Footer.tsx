"use client"
import React, { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ChevronUp, School, Globe, Heart, Users, Star, Zap, Calendar } from 'lucide-react'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated CSS rain effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="rain-container">
          {/* CSS-only animated rain */}
          <div className="rain-drop rain-1"></div>
          <div className="rain-drop rain-2"></div>
          <div className="rain-drop rain-3"></div>
          <div className="rain-drop rain-4"></div>
          <div className="rain-drop rain-5"></div>
          <div className="rain-drop rain-6"></div>
          <div className="rain-drop rain-7"></div>
          <div className="rain-drop rain-8"></div>
          <div className="rain-drop rain-9"></div>
          <div className="rain-drop rain-10"></div>
        </div>
      </div>

      {/* Lightning effect */}
      <div className="absolute inset-0 bg-white opacity-0 pointer-events-none animate-pulse" style={{animationDuration: '4s'}}></div>

      {/* Decorative animated top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 via-yellow-400 to-green-400"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-cyan-400 rotate-45 animate-spin" style={{animationDuration: '10s'}}></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border-2 border-pink-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-yellow-400 transform rotate-45 animate-ping" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Main content */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* School Info - Enhanced */}
          <div className="lg:col-span-1 transform transition-all duration-700 hover:-translate-y-2">
              
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 transform rotate-12 scale-150"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-xl transform transition-transform group-hover:rotate-12">
                      <School className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Northgate Institution
                    </h2>
                    <p className="text-gray-400 text-sm flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>Excellence Since 1990</span>
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-8 leading-relaxed text-base lg:text-lg">
                  <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent font-bold">
                    Empowering minds
                  </span>, 
                  <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
                    {" "}shaping futures
                  </span>. 
                  Where innovation meets education in the digital age.
                </p>

                {/* Enhanced social media with better mobile spacing */}
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  {[
                    { Icon: Facebook, color: 'hover:text-blue-400', bg: 'hover:bg-blue-500/20', name: 'Facebook' },
                    { Icon: Twitter, color: 'hover:text-sky-400', bg: 'hover:bg-sky-500/20', name: 'Twitter' },
                    { Icon: Instagram, color: 'hover:text-pink-400', bg: 'hover:bg-pink-500/20', name: 'Instagram' },
                    { Icon: Youtube, color: 'hover:text-red-400', bg: 'hover:bg-red-500/20', name: 'YouTube' }
                  ].map(({ Icon, color, bg, name }, index) => (
                    <div 
                      key={index} 
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 border-gray-600 flex items-center justify-center transform transition-all duration-300 hover:-translate-y-2 hover:scale-110 ${bg} cursor-pointer group relative`}
                      title={name}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 ${color} transition-colors duration-300 relative z-10`} />
                    </div>
                  ))}
                </div>
              </div>
            
          </div>

          {/* Quick Links - Redesigned */}
          <div className="transform transition-all duration-500 hover:-translate-y-2">
             
              {/* Animated corner decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-8 relative flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Quick Links
                  </span>
                </h3>
                
                <ul className="space-y-4">
                  {[
                    { name: 'About Us', icon: Users, color: 'from-cyan-400 to-blue-400' },
                    { name: 'Academics', icon: School, color: 'from-green-400 to-emerald-400' },
                    { name: 'Admission', icon: Star, color: 'from-yellow-400 to-orange-400' },
                    { name: 'Events', icon: Calendar, color: 'from-pink-400 to-red-400' },
                    { name: 'Gallery', icon: Heart, color: 'from-purple-400 to-indigo-400' },
                    { name: 'Contact', icon: Globe, color: 'from-teal-400 to-cyan-400' }
                  ].map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <li key={index} className="group">
                        <a
                          href={`/${item.name.toLowerCase().replace(' ', '-')}`}
                          className="flex items-center space-x-4 text-gray-300 hover:text-white transition-all duration-300 p-3 rounded-xl hover:bg-white/5 hover:backdrop-blur-sm border border-transparent hover:border-white/10"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-300">
                            {item.name}
                          </span>
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ChevronUp className="w-4 h-4 text-gray-400 rotate-90" />
                          </div>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
           
          </div>

          {/* Contact Info - Enhanced */}
          <div className="sm:col-span-2 lg:col-span-1 transform transition-all duration-500 hover:-translate-y-2">
              
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-8 relative flex items-center space-x-3">
                  <Phone className="w-6 h-6 text-emerald-400 animate-bounce" />
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Contact Info
                  </span>
                </h3>
                
                <div className="space-y-6">
                  {[
                    { 
                      Icon: MapPin, 
                      text: "Hajimore ( two minutes away from, railway Bhagbhado, Samsi, Chandua, West Bengal 732139",
                      gradient: "from-red-500 to-pink-600",
                      textColor: "from-red-400 to-pink-400",
                      label: "Address"
                    },
                    { 
                      Icon: Phone, 
                      text: "+91 9593903422",
                      gradient: "from-green-500 to-emerald-600",
                      textColor: "from-green-400 to-emerald-400",
                      label: "Phone"
                    },
                    { 
                      Icon: Mail, 
                      text: "northgateinstitution@gmail.com",
                      gradient: "from-blue-500 to-cyan-600",
                      textColor: "from-blue-400 to-cyan-400",
                      label: "Email"
                    },
                    { 
                      Icon: Globe, 
                      text: "www.northgateinstitution.com",
                      gradient: "from-purple-500 to-indigo-600",
                      textColor: "from-purple-400 to-indigo-400",
                      label: "Website"
                    }
                  ].map(({ Icon, text, gradient, textColor, label }, index) => (
                    <div key={index} className="flex items-start space-x-4 group cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                      <div className="relative flex-shrink-0">
                        <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300`}></div>
                        <div className={`relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">{label}</div>
                        <span className={`text-gray-300 group-hover:bg-gradient-to-r group-hover:${textColor} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 font-medium text-sm sm:text-base break-words`}>
                          {text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                
                
              </div>

          </div>
        </div>

        {/* Bottom section - Mobile optimized */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-gray-800/50">
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-8 flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              <div className="text-center lg:text-left">
                <p className="text-lg sm:text-xl mb-2">
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent font-bold">
                    © 2025  All rights reserved | Northgate Institution
                  </span>
                  
                </p>
                <p className="text-sm sm:text-base text-gray-400">
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent font-bold">
                   Design & Developed by Mostafijur Rahman | 8538061476
                  </span>
                  <span className="hidden sm:inline"> | </span>
                  <br className="sm:hidden" />
                  <a href="#" className="hover:text-cyan-400 transition-colors duration-300 underline decoration-dotted">Privacy Policy</a>
                  <span className="mx-2">|</span>
                  <a href="#" className="hover:text-cyan-400 transition-colors duration-300 underline decoration-dotted">Terms of Service</a>
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
                {[
                  { name: 'Support', gradient: 'from-green-400 via-blue-500 to-purple-500', icon: Heart },
                  { name: 'FAQ', gradient: 'from-pink-400 via-red-500 to-yellow-500', icon: Users },
                  { name: 'Careers', gradient: 'from-indigo-400 via-purple-500 to-pink-500', icon: Star }
                ].map(({ name, gradient, icon: IconComponent }, index) => (
                  <a
                    key={index}
                    href="#"
                    className="group flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-800/50 rounded-full border border-gray-700 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm"
                  >
                    <IconComponent className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    <span className={`text-sm sm:text-base bg-gradient-to-r ${gradient} bg-clip-text text-transparent group-hover:opacity-80 transition font-bold`}>
                      {name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          
        </div>
      </div>

      {/* Enhanced scroll to top button - Mobile optimized */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl transform transition-all duration-300 hover:-translate-y-3 hover:shadow-cyan-500/30 hover:scale-110 z-50 border-2 border-white/20 backdrop-blur-sm"
          aria-label="Scroll to top"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur opacity-50"></div>
          <ChevronUp className="w-5 h-5 sm:w-7 sm:h-7 text-white relative z-10 animate-bounce" />
        </button>
      )}

      {/* CSS for rain animation */}
      <style jsx>{`
        .rain-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .rain-drop {
          position: absolute;
          width: 2px;
          height: 50px;
          background: linear-gradient(to bottom, rgba(59, 130, 246, 0.8), transparent);
          animation: rain-fall linear infinite;
        }
        
        .rain-1 { left: 10%; animation-duration: 0.7s; animation-delay: 0s; }
        .rain-2 { left: 20%; animation-duration: 0.8s; animation-delay: 0.2s; }
        .rain-3 { left: 30%; animation-duration: 0.6s; animation-delay: 0.4s; }
        .rain-4 { left: 40%; animation-duration: 0.9s; animation-delay: 0.1s; }
        .rain-5 { left: 50%; animation-duration: 0.7s; animation-delay: 0.3s; }
        .rain-6 { left: 60%; animation-duration: 0.8s; animation-delay: 0.5s; }
        .rain-7 { left: 70%; animation-duration: 0.6s; animation-delay: 0s; }
        .rain-8 { left: 80%; animation-duration: 0.9s; animation-delay: 0.2s; }
        .rain-9 { left: 90%; animation-duration: 0.7s; animation-delay: 0.4s; }
        .rain-10 { left: 15%; animation-duration: 0.8s; animation-delay: 0.6s; }
        
        @keyframes rain-fall {
          from {
            transform: translateY(-100vh) rotate(15deg);
          }
          to {
            transform: translateY(100vh) rotate(15deg);
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer