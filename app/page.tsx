"use client"
import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, Users, Trophy, Calendar, Star, ArrowRight, Globe, X } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Notice } from '@/types'

// HomeNoticesQuizSection Component
const HomeNoticesQuizSection = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedNotices, setExpandedNotices] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/notices?limit=3&offset=0', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });

        if (response.ok) {
          const data = await response.json();
          setNotices(Array.isArray(data) ? data : []);
        } else {
          setNotices([]);
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedNotices);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNotices(newExpanded);
  };

  const isNewNotice = (dateString: string) => {
    const noticeDate = new Date(dateString);
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    return noticeDate > tenDaysAgo;
  };

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return '📎';
    
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType === 'application/pdf') return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType === 'text/plain') return '📄';
    return '📎';
  };

  return (
    <div className="w-full py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -left-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-20 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-12">
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            📢 Latest Notice Updates & 🧠 Quick Quiz 
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed and test your knowledge
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full animate-expand"></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 w-full px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Side - Notices Box */}
          <div className="animate-slide-in">
            <div className="bg-white/80 backdrop-blur-md rounded-5xl shadow-xl border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
              {/* Notices Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 relative">
                {/* Marquee with New Emojis */}
                <div className="absolute top-0 right-0 h-full w-20 overflow-hidden">
                  <div className="animate-marquee-vertical h-full flex flex-col justify-center">
                    <div className="text-2xl space-y-2 animate-bounce">
                      <div>🆕</div>          
                      <div>📢</div>
                      <div>🔥</div>
                      <div>⭐</div>
                      <div>🚀</div>
                      <div>💫</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">📢 Latest Notices</h3>
                    <p className="text-blue-100">Stay updated with important announcements</p>
                  </div>
                </div>
              </div>

              {/* Notices Content */}
              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                      <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin absolute top-2 left-2" style={{animationDirection: 'reverse', animationDuration: '0.8s'}}></div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notices.slice(0, 3).map((notice, index) => (
                      <article
                        key={notice.id}
                        className="group bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl border border-gray-200 hover:shadow-lg transform hover:scale-[1.01] transition-all duration-300 overflow-hidden"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="p-4 md:p-6 relative">
                          {/* Gradient Border Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                          
                          <div className="relative z-10">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-bold text-gray-800 text-sm md:text-base line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                                    {notice.title}
                                  </h4>
                                  {isNewNotice(notice.created_at) && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-red-600 bg-red-100 animate-pulse">
                                      🔴 NEW
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 ml-2 bg-gray-100 px-2 py-1 rounded-lg flex-shrink-0">
                                {new Date(notice.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </div>
                            </div>
                            
                            {/* Enhanced Content */}
                            <div className="text-gray-600 text-sm mb-3 leading-relaxed">
                              {notice.content.length > 100 && !expandedNotices.has(notice.id) ? (
                                <>
                                  <p className="whitespace-pre-wrap">
                                    {notice.content.substring(0, 100)}...
                                  </p>
                                  <button
                                    onClick={() => toggleExpand(notice.id)}
                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium mt-2 text-xs px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-300"
                                  >
                                    📖 Read More
                                  </button>
                                </>
                              ) : (
                                <>
                                  <p className="whitespace-pre-wrap">{notice.content}</p>
                                  {notice.content.length > 100 && (
                                    <button
                                      onClick={() => toggleExpand(notice.id)}
                                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium mt-2 text-xs px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-300"
                                    >
                                      📚 Show Less
                                    </button>
                                  )}
                                </>
                              )}
                            </div>

                            {/* Enhanced File Attachment */}
                            {notice.file_name && notice.file_url && (
                              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3 transform hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xl animate-bounce">{getFileIcon(notice.file_type)}</span>
                                    <div>
                                      <p className="font-semibold text-blue-900 text-xs">📎 Attachment</p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => window.open(notice.file_url, '_blank')}
                                    className="px-3 py-1 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 text-xs font-semibold"
                                  >
                                    🔍 View
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* View All Notices Button */}
                <div className="mt-6 text-center">
                  <a
                    href="/notices"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    📋 View All Notices
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Quiz Section */}
          <div className="animate-slide-in" style={{animationDelay: '0.2s'}}>
            <div className="bg-white/80 backdrop-blur-md rounded-5xl shadow-xl border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
              {/* Quiz Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 relative">
                {/* Marquee with Quiz Emojis */}
                <div className="absolute top-0 left-0 h-full w-20 overflow-hidden">
                  <div className="animate-marquee-vertical-reverse h-full flex flex-col justify-center">
                    <div className="text-2xl space-y-2 animate-bounce" style={{animationDelay: '0.5s'}}>
                      <div>🧠</div>
                      <div>🎯</div>
                      <div>🏆</div>
                      <div>💡</div>
                      <div>⚡</div>
                      <div>🎪</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="ml-12">
                    <h3 className="text-2xl font-bold text-white mb-2">🧠 Quick Quiz Start Now</h3>
                    <p className="text-purple-100">Test your knowledge now!</p>
                  </div>
                </div>
              </div>

              {/* Quiz Content */}
              <div className="p-6">
                <div className="text-center py-8">
                  {/* Quiz Icon Animation */}
                  <div className="relative mb-6">
                    <div className="text-8xl animate-bounce">🎯</div>
                    <div className="absolute -top-2 -right-2 text-3xl animate-ping">⭐</div>
                    <div className="absolute -bottom-2 -left-2 text-3xl animate-pulse">🏆</div>
                  </div>

                  <h4 className="text-2xl font-bold text-gray-800 mb-4">
                    Ready for a Challenge? 🚀
                  </h4>
                  
                  <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    Test your knowledge with our interactive quizzes. 
                    Improve your skills and compete with others!
                  </p>

                  {/* Quiz Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-blue-600">Unlimited</div>
                      <div className="text-sm text-gray-600">Questions</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-purple-600">No limit</div>
                      <div className="text-sm text-gray-600">Categories</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-green-600">Open for Everyone</div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                  </div>

                  {/* Quiz Start Button */}
                  <a
                    href="/student/solve"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-lg rounded-2xl hover:from-purple-600 hover:to-pink-700 transform hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl animate-pulse"
                  >
                    🎯 Start Quiz Now
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>

                  {/* Additional Info */}
                  <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="animate-pulse">⏱️</span>
                      <span>Short Test 30 min and Full Test: 3 Hours</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <span className="animate-bounce">🎁</span>
                      <span>Instant Results</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-in {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 8rem; }
        }
        
        @keyframes marquee-vertical {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        
        @keyframes marquee-vertical-reverse {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-slide-in { animation: slide-in 0.8s ease-out; }
        .animate-expand { animation: expand 1.2s ease-out; }
        .animate-marquee-vertical { animation: marquee-vertical 3s linear infinite; }
        .animate-marquee-vertical-reverse { animation: marquee-vertical-reverse 3s linear infinite; }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeFeature, setActiveFeature] = useState(0)
  const [showWelcomePopup, setShowWelcomePopup] = useState(true)

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: <BookOpen className="w-12 h-12 text-blue-500" />,
      title: "Quality Education",
      description: "Comprehensive curriculum designed to foster academic excellence and personal growth with innovative teaching methods.",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: "Expert Faculty",
      description: "Dedicated teachers committed to nurturing each student's unique potential with personalized attention.",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Trophy className="w-12 h-12 text-amber-500" />,
      title: "Outstanding Results",
      description: "Consistent track record of academic achievements and student success stories across all disciplines.",
      color: "from-amber-400 to-orange-400",
      bgColor: "bg-amber-50"
    },
    {
      icon: <Calendar className="w-12 h-12 text-green-500" />,
      title: "Rich Activities",
      description: "Diverse extracurricular programs to develop well-rounded personalities and leadership skills.",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-green-50"
    }
  ]

  // Carousel images
  const carouselImages = [
    {
      src: "/1.jpg",
      alt: "Students in classroom"
    },
    {
      src: "/2.jpg",
      alt: "Graduation ceremony"
    },
    {
      src: "/3.jpg",
      alt: "Students in science lab"
    },
    {
      src: "/4.jpg",
      alt: "Students in library"
    },
    {
      src: "/test.jpg",
      alt: "Sports and activities"
    },
    {
      src: "/6.jpg",
      alt: "Campus view"
    }
  ]

  return (
    <Layout>
      {/* Welcome Popup with Light Creative Design */}
      {showWelcomePopup && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-br from-primary via-blue-50 to-purple-50 animate-fade-in">

            {/* Floating Pastel Orbs */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-40 h-40 bg-pink-300/30 rounded-full blur-3xl opacity-40 animate-bounce"></div>
              <div className="absolute bottom-10 right-20 w-56 h-56 bg-blue-300/30 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-yellow-300/30 rounded-full blur-3xl opacity-30 animate-spin-slow"></div>
            </div>

            {/* Content */}
            <div className="relative p-10 md:p-14 flex flex-col">
              {/* Close button */}
              <button
                onClick={() => setShowWelcomePopup(false)}
                className="absolute top-5 right-5 w-10 h-10 bg-white shadow hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                {/* Animated Multicolor Heading */}
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent animate-gradient-x">
                  Welcome to Northgate Institution
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed animate-fade-in-delay">
                  Step into a world of <span className="font-semibold text-blue-600">knowledge</span>,
                  <span className="font-semibold text-purple-600"> innovation</span>, and
                  <span className="font-semibold text-amber-600"> endless opportunities</span>.
                  Your journey of discovery begins here.
                </p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border hover:shadow-lg transition-all">
                  <BookOpen className="w-8 h-8 text-blue-500 mb-3 animate-float" />
                  <h3 className="text-gray-800 font-semibold mb-1">Interactive Learning</h3>
                  <p className="text-sm text-gray-600">Engage with dynamic content</p>
                </div>
                <div className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border hover:shadow-lg transition-all">
                  <Trophy className="w-8 h-8 text-purple-500 mb-3 animate-float-delay" />
                  <h3 className="text-gray-800 font-semibold mb-1">Track Progress</h3>
                  <p className="text-sm text-gray-600">Monitor your achievements</p>
                </div>
                <div className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border hover:shadow-lg transition-all">
                  <svg className="w-8 h-8 text-amber-500 mb-3 animate-float-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <h3 className="text-gray-800 font-semibold mb-1">Skill Assessment</h3>
                  <p className="text-sm text-gray-600">Test your knowledge with quizzes</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/student/solve"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 group"
                >
                  <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Start Quiz Now</span>
                </Link>

                <button
                  onClick={() => setShowWelcomePopup(false)}
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-4 px-6 rounded-2xl font-semibold transition-all flex items-center justify-center"
                >
                  Exit
                </button>
              </div>

              {/* Footer Note */}
              <p className="text-center text-sm text-gray-500 mt-6 animate-fade-in-delay">
                You can always access quizzes later from your dashboard.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.5}%`,
            top: `${mousePosition.y * 0.5}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-200/20 to-yellow-200/20 rounded-full blur-2xl animate-bounce"
          style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/5 w-48 h-48 bg-gradient-to-r from-green-200/25 to-blue-200/25 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section with Image-Only Carousel */}
      <section className="relative h-screen overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          speed={1500}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          loop={true}
          className="h-full w-full"
        >
          {carouselImages.map((image, index) => (
            <SwiperSlide key={index} className="relative h-full w-full group">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                className="object-cover transition-transform duration-[6000ms] group-hover:scale-110"
              />

              {/* Subtle Overlay for Better Image Visibility */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>

              {/* Floating Decorative Elements */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-bounce backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.5}s` }} />
              <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.7}s` }} />
              <div className="absolute top-1/2 right-20 w-12 h-12 bg-blue-400/20 rounded-full animate-bounce backdrop-blur-sm"
                style={{ animationDelay: `${index * 1.2}s`, animationDuration: '3s' }} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Optional: Custom Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {carouselImages.map((_, index) => (
              <div
                key={index}
                className="w-2 h-8 bg-white/40 hover:bg-white/70 transition-all duration-300 cursor-pointer rounded-full backdrop-blur-sm"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Notices & Quiz Section */}
      <HomeNoticesQuizSection />

      {/* About Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-600 font-semibold mb-6 animate-bounce">
                About Northgate Institution
              </div>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Northgate Institution is a center of academic excellence dedicated to guiding students towards a brighter future. We offer Class XI & XII (Science and Arts) education along with specialized coaching for NEET and IIT-JEE. With experienced teachers, modern facilities, safe residential care, and a supportive learning environment, we ensure that every student gets the right guidance, discipline, and motivation to achieve success.
              </p>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                নর্থগেট ইনস্টিটিউশন হলো একটি আধুনিক শিক্ষাকেন্দ্র যেখানে গড়ে ওঠে উজ্জ্বল ভবিষ্যৎ। এখানে একাদশ ও দ্বাদশ (বিজ্ঞান ও কলা বিভাগ) এর পাশাপাশি NEET ও IIT-JEE-র বিশেষ প্রশিক্ষণ দেওয়া হয়। অভিজ্ঞ শিক্ষক, আধুনিক পরিকাঠামো, নিরাপদ আবাসন ও সহায়ক শিক্ষার পরিবেশের মাধ্যমে আমরা প্রতিটি শিক্ষার্থীকে সঠিক দিশা, শৃঙ্খলা ও প্রেরণা দিয়ে সাফল্যের পথে এগিয়ে নিয়ে যাই।
              </p>

              <Link href="/about/introduction" className="group inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span>Learn More About Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Visual */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                {/* Main Image Placeholder */}
                <div className="w-full h-96 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center text-white text-6xl font-bold shadow-2xl hover:scale-105 transition-transform duration-500">
                  About
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-bounce">
                  <BookOpen className="w-12 h-12 text-indigo-500" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-xl flex items-center justify-center animate-pulse">
                  <Trophy className="w-14 h-14 text-white" />
                </div>
                <div className="absolute top-1/2 -right-12 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-xl flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                  <Star className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-100/20 to-purple-100/20 text-blue-600 font-semibold mb-4 backdrop-blur-sm">
              Our Purpose
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Mission & Vision
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="group relative">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 hover:bg-white transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-bounce">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  At Northgate Institution, we don&apos;t just teach—we inspire.
                  Our mission is simple: to guide students with the right knowledge, care, and confidence so they can dream bigger and achieve higher. With expert teachers, modern facilities, and a safe environment, we prepare every student for success in XI, XII, NEET, and IIT-JEE.

                  Your child&apos;s future is our responsibility—and their success, our pride.
                </p>
                <div className="border-l-4 border-rose-400 pl-6">
                  <div className="text-xl font-bold text-gray-800 mb-2">Best Regards </div>
                  <div className="text-rose-600 font-semibold mb-2">Nawaj Sarif</div>
                </div>

                <Link href="/about/vision" className="group inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <span>Learn More Vision & Mission</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 hover:bg-white transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-bounce">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  We dream of raising young people who are not only knowledgeable but also honest, kind, and responsible. Our vision is to see our students grow into trusted professionals in respected fields, carrying with them a deep sense of care for others. More than success alone, we want them to value integrity, compassion, and service to society. By nurturing both heart and mind, our school seeks to prepare future leaders who will use their talents to make the world more fair, caring, and hopeful for everyone.
                </p>

                <Link href="/about/vision" className="group inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <span>Learn More Vision & Mission</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Director's Message Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-rose-200/30 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-200/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-yellow-200/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '15s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-rose-100 to-orange-100 text-rose-600 font-semibold mb-4">
                Director&apos;s Message
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-rose-600 bg-clip-text text-transparent">
                From Our Director&apos;s Message
              </h2>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* Director Image */}
              <div className="lg:col-span-2">
                <div className="relative group">
                  <div className="w-full h-96 bg-gradient-to-br from-rose-400 to-orange-500 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    Director&apos;s
                  </div>

                  {/* Floating Quote Icon */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl animate-bounce">
                    <span className="text-2xl text-rose-500">&quot;</span>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80 animate-pulse" />
                </div>
              </div>

              {/* Message Content */}
              <div className="lg:col-span-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">

                  <p className="text-xl text-gray-700 leading-relaxed mb-8 italic text-justify">
                    &quot;Welcome to <span className="font-bold">NORTHGATE INSTITUTION</span>. Our
                    INSTITUTION is to nurture young minds with a blend of modern education, moral
                    values, and creativity, helping them build a bright and purposeful future.
                    <br />
                    We believe every child is gifted with unique potential, and with proper guidance,
                    they will grow into confident, responsible, and proud citizens of tomorrow.
                    <br />
                    <span className="font-bold">Your trust and support are our greatest strength.</span>&quot;
                  </p>

                  <div className="border-l-4 border-rose-400 pl-6">
                    <div className="text-xl font-bold text-gray-800 mb-2">Best Regards </div>
                    <div className="text-rose-600 font-semibold mb-2">Director&apos;s</div>
                    <div className="text-gray-600 text-sm"> Md Rahamat Alam</div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link href="/about/directorMsg" className="group inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                      <span>Click Here to Read Full Message</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/contact" className="group inline-flex items-center space-x-2 border-2 border-rose-400 text-rose-600 hover:bg-rose-400 hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
                      <span>Contact Us</span>
                      <Calendar className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-600 font-semibold mb-4">
              Academic Excellence
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-emerald-600 bg-clip-text text-transparent">
              Our Academic Programs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Primary Education", grade: "Classes I - V", icon: "🎨", color: "from-pink-400 to-red-400" },
              { title: "Middle School", grade: "Classes VI - VIII", icon: "🔬", color: "from-blue-400 to-indigo-400" },
              { title: "Secondary School", grade: "Classes IX - X", icon: "📖", color: "from-green-400 to-emerald-400" },
              { title: "Senior Secondary", grade: "Classes XI - XII", icon: "🎓", color: "from-purple-400 to-pink-400" },
              { title: "Science Stream", grade: "PCM, PCB", icon: "⚗️", color: "from-orange-400 to-red-400" },
              { title: "Commerce Stream", grade: "Accounts, Economics", icon: "💼", color: "from-teal-400 to-cyan-400" }
            ].map((program, index) => (
              <div
                key={program.title}
                className="group bg-white/90 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:animate-bounce`}>
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-emerald-600 font-semibold mb-4">{program.grade}</p>
                <p className="text-gray-600 mb-6">Comprehensive curriculum designed to build strong foundations and prepare students for future challenges.</p>
                <Link href="/academics" className="group inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 font-semibold mb-4 animate-bounce">
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Exceptional Learning Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover what makes our institution the perfect choice for your educational journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group relative ${feature.bgColor} rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${activeFeature === index ? 'ring-4 ring-blue-200' : ''
                  }`}
                onMouseEnter={() => setActiveFeature(index)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Floating Icon */}
                <div className="relative mb-6 group-hover:animate-bounce">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    {feature.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-4 flex items-center text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                  <span className="text-sm font-semibold mr-2">Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}