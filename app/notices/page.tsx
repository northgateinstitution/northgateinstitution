'use client'

import { useState, useEffect, useCallback } from 'react'
import { Notice } from '@/types'
import Layout from '@/components/Layout'

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [expandedNotices, setExpandedNotices] = useState<Set<string>>(new Set())
  const itemsPerPage = 10

  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true)
      const offset = (currentPage - 1) * itemsPerPage
      
      const response = await fetch(
        `/api/notices?limit=${itemsPerPage}&offset=${offset}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        }
      )

      if (response.ok) {
        const data = await response.json()
        const total = response.headers.get('X-Total-Count')
        
        setNotices(Array.isArray(data) ? data : [])
        setTotalCount(total ? parseInt(total) : 0)
        setError('')
      } else {
        setError('Failed to load notices')
        setNotices([])
      }
    } catch (error) {
      console.error('Error fetching notices:', error)
      setError('Error loading notices')
      setNotices([])
    } finally {
      setLoading(false)
    }
  }, [currentPage])

  useEffect(() => {
    fetchNotices()
  }, [fetchNotices])

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedNotices)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedNotices(newExpanded)
  }

  const isNewNotice = (dateString: string) => {
    const noticeDate = new Date(dateString)
    const tenDaysAgo = new Date()
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10)
    return noticeDate > tenDaysAgo
  }

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return '📎'
    
    if (fileType.startsWith('image/')) return '🖼️'
    if (fileType === 'application/pdf') return '📄'
    if (fileType.includes('word') || fileType.includes('document')) return '📝'
    if (fileType === 'text/plain') return '📄'
    return '📎'
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    const kb = bytes / 1024
    const mb = kb / 1024
    
    if (mb >= 1) return `${mb.toFixed(1)}MB`
    return `${kb.toFixed(1)}KB`
  }

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(totalCount / itemsPerPage)

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 -left-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-20 animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
          {/* Page Header with Animation */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-slide-down">
              📢 Official Notices
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up">
              Stay updated with the latest announcements and important information
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full animate-expand"></div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="mb-12 flex justify-center animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="relative max-w-xl w-full">
              <input
                type="text"
                placeholder="🔍 Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-lg border-2 border-transparent bg-white/70 backdrop-blur-md rounded-2xl shadow-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 hover:shadow-2xl"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced Loading State */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-20 animate-fade-in">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin absolute top-2 left-2" style={{animationDirection: 'reverse', animationDuration: '0.8s'}}></div>
              </div>
              <span className="mt-6 text-xl text-gray-600 font-medium animate-pulse">Loading amazing notices...</span>
            </div>
          )}

          {/* Enhanced Error State */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6 mb-8 shadow-lg animate-shake">
              <div className="flex items-center">
                <div className="text-red-400 mr-4 text-2xl animate-bounce">⚠️</div>
                <div className="text-red-700 text-lg font-medium">{error}</div>
              </div>
            </div>
          )}

          {/* Enhanced Notices List */}
          {!loading && !error && (
            <>
              <div className="grid gap-6 md:gap-8">
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice, index) => (
                    <article
                      key={notice.id}
                      className="group bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500 overflow-hidden border border-white/50 animate-slide-in"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="p-6 md:p-8 relative">
                        {/* Gradient Border Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                  {notice.title}
                                </h2>
                                {isNewNotice(notice.created_at) && (
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-red-600 bg-red-100 animate-pulse">
                                    🔴 NEW
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500 ml-4 flex-shrink-0 bg-gray-100 px-3 py-2 rounded-xl">
                              📅 {new Date(notice.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                          
                          {/* Enhanced Content */}
                          <div className="text-gray-700 mb-6 leading-relaxed">
                            {notice.content.length > 200 && !expandedNotices.has(notice.id) ? (
                              <>
                                <p className="whitespace-pre-wrap text-lg">
                                  {notice.content.substring(0, 200)}...
                                </p>
                                <button
                                  onClick={() => toggleExpand(notice.id)}
                                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-3 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 transform hover:scale-105"
                                >
                                  📖 Read More
                                </button>
                              </>
                            ) : (
                              <>
                                <p className="whitespace-pre-wrap text-lg">{notice.content}</p>
                                {notice.content.length > 200 && (
                                  <button
                                    onClick={() => toggleExpand(notice.id)}
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-3 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 transform hover:scale-105"
                                  >
                                    📚 Show Less
                                  </button>
                                )}
                              </>
                            )}
                          </div>

                          {/* Enhanced File Attachment */}
                          {notice.file_name && notice.file_url && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4 transform hover:scale-[1.02] transition-all duration-300">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <span className="text-3xl animate-bounce">{getFileIcon(notice.file_type)}</span>
                                  <div>
                                    <p className="font-bold text-blue-900 text-lg">📎 Attachment</p>
                                    <p className="text-sm text-gray-600">{notice.file_name}</p>
                                    {notice.file_size && (
                                      <p className="text-xs text-gray-500">{formatFileSize(notice.file_size)}</p>
                                    )}
                                  </div>
                                </div>
                                <button
                                  onClick={() => window.open(notice.file_url, '_blank')}
                                  className="px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl font-bold"
                                >
                                  🔍 View
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-20 animate-fade-in">
                    <div className="text-8xl mb-8 animate-bounce">📭</div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                      {searchTerm ? '🔍 No matching notices found' : '📄 No notices available'}
                    </h3>
                    <p className="text-xl text-gray-600 max-w-md mx-auto">
                      {searchTerm 
                        ? 'Try adjusting your search terms or check back later'
                        : 'Check back soon for new announcements and updates'
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center animate-fade-in" style={{animationDelay: '0.5s'}}>
                  <nav className="flex items-center space-x-3">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-6 py-3 font-bold text-gray-600 bg-white/70 backdrop-blur-md border-2 border-gray-200 rounded-2xl hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                    >
                      ← Previous
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1
                        const isActive = page === currentPage
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-3 font-bold rounded-2xl transition-all duration-300 transform hover:scale-110 ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                : 'text-gray-700 bg-white/70 backdrop-blur-md border-2 border-gray-200 hover:bg-white hover:shadow-lg'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-6 py-3 font-bold text-gray-600 bg-white/70 backdrop-blur-md border-2 border-gray-200 rounded-2xl hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                    >
                      Next →
                    </button>
                  </nav>
                </div>
              )}

              {/* Enhanced Stats */}
              {notices.length > 0 && (
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg text-gray-600 font-medium animate-pulse">
                    📊 Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} notices
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slide-down {
            from { transform: translateY(-30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes slide-up {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes slide-in {
            from { transform: translateX(-30px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes expand {
            from { width: 0; }
            to { width: 8rem; }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          
          .animate-fade-in { animation: fade-in 0.8s ease-out; }
          .animate-slide-down { animation: slide-down 0.8s ease-out; }
          .animate-slide-up { animation: slide-up 0.8s ease-out; }
          .animate-slide-in { animation: slide-in 0.8s ease-out; }
          .animate-expand { animation: expand 1.2s ease-out; }
          .animate-shake { animation: shake 0.5s ease-in-out; }
        `}</style>
      </div>
    </Layout>
  )
}