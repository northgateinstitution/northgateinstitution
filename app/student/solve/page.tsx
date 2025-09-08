'use client'

import { useState, useEffect } from 'react'
import { Category } from '@/types'
import Quiz from '@/components/Quiz'
import Layout from '@/components/Layout'
import { BookOpen, Trophy, User, Mail, Phone } from 'lucide-react'

// Helper function to get subject-specific icons
const getSubjectIcon = (subjectName: string): string => {
  const subject = subjectName.toLowerCase()
  if (subject.includes('math') || subject.includes('algebra') || subject.includes('calculus')) return '🧮'
  if (subject.includes('physics')) return '⚛️'
  if (subject.includes('chemistry')) return '🧪'
  if (subject.includes('biology') || subject.includes('life')) return '🧬'
  if (subject.includes('english') || subject.includes('literature')) return '📖'
  if (subject.includes('history')) return '🏛️'
  if (subject.includes('geography')) return '🌍'
  if (subject.includes('computer') || subject.includes('programming')) return '💻'
  if (subject.includes('art') || subject.includes('design')) return '🎨'
  if (subject.includes('music')) return '🎵'
  if (subject.includes('economics')) return '📊'
  if (subject.includes('psychology')) return '🧠'
  if (subject.includes('engineering')) return '⚙️'
  if (subject.includes('medical') || subject.includes('medicine')) return '🩺'
  if (subject.includes('law') || subject.includes('legal')) return '⚖️'
  if (subject.includes('business')) return '💼'
  return '📚'
}

// Helper function to get subject descriptions
const getSubjectDescription = (subjectName: string, type: string): string => {
  const subject = subjectName.toLowerCase()
  
  if (type === 'competitive') {
    return 'Comprehensive exam preparation with practice tests and strategies'
  }
  
  if (subject.includes('math')) return 'Mathematical concepts, problem solving, and analytical thinking'
  if (subject.includes('physics')) return 'Physical laws, mechanics, and scientific phenomena'
  if (subject.includes('chemistry')) return 'Chemical reactions, molecular structures, and laboratory concepts'
  if (subject.includes('biology')) return 'Life sciences, anatomy, and biological processes'
  if (subject.includes('english')) return 'Language skills, literature analysis, and communication'
  if (subject.includes('history')) return 'Historical events, civilizations, and cultural studies'
  if (subject.includes('geography')) return 'Earth sciences, maps, and environmental studies'
  if (subject.includes('computer')) return 'Programming, algorithms, and technology concepts'
  
  return 'Comprehensive study material and practice questions'
}

export default function SolveQuestions() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [quizType, setQuizType] = useState<'short' | 'full'>('short')
  const [showQuiz, setShowQuiz] = useState(false)
  const [showStudentForm, setShowStudentForm] = useState(false)
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    mobile: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!studentInfo.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!studentInfo.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(studentInfo.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!studentInfo.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^\d{10}$/.test(studentInfo.mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleStartQuiz = () => {
    if (!selectedCategory) {
      alert('Please select a category')
      return
    }
    setShowStudentForm(true)
  }

  const handleStudentFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowStudentForm(false)
      setShowQuiz(true)
    }
  }

  const handleQuizComplete = (attemptId: string) => {
    console.log('Quiz completed with attempt ID:', attemptId)
  }

  const handleQuizBack = () => {
    setShowQuiz(false)
    setShowStudentForm(false)
    setStudentInfo({ name: '', email: '', mobile: '' })
    setSelectedCategory('')
  }

  if (showQuiz) {
    return (
      <Layout>
        <Quiz
          studentName={studentInfo.name}
          studentEmail={studentInfo.email}
          studentMobile={studentInfo.mobile}
          categoryId={selectedCategory}
          quizType={quizType}
          onComplete={handleQuizComplete}
          onBack={handleQuizBack}
        />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 md:py-8 lg:py-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Student Information Form Modal */}
          {showStudentForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-lg w-full transform animate-scale-up my-8">
                <div className="p-6 md:p-8 border-b border-gray-200">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                    <User className="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3 text-indigo-600" />
                    Student Information
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 mt-2 md:mt-3">Please provide your details to start the quiz</p>
                </div>

                <form onSubmit={handleStudentFormSubmit} className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
                  <div>
                    <label className="block text-base md:text-lg font-semibold text-gray-700 mb-2 md:mb-3">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="h-5 w-5 md:h-6 md:w-6 absolute left-3 md:left-4 top-3 md:top-4 text-gray-400" />
                      <input
                        type="text"
                        value={studentInfo.name}
                        onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                        className={`w-full pl-10 md:pl-12 pr-4 md:pr-6 py-3 md:py-4 text-base md:text-lg border-2 rounded-lg md:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          errors.name ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm md:text-base mt-1 md:mt-2">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-base md:text-lg font-semibold text-gray-700 mb-2 md:mb-3">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="h-5 w-5 md:h-6 md:w-6 absolute left-3 md:left-4 top-3 md:top-4 text-gray-400" />
                      <input
                        type="email"
                        value={studentInfo.email}
                        onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                        className={`w-full pl-10 md:pl-12 pr-4 md:pr-6 py-3 md:py-4 text-base md:text-lg border-2 rounded-lg md:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          errors.email ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm md:text-base mt-1 md:mt-2">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-base md:text-lg font-semibold text-gray-700 mb-2 md:mb-3">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="h-5 w-5 md:h-6 md:w-6 absolute left-3 md:left-4 top-3 md:top-4 text-gray-400" />
                      <input
                        type="tel"
                        value={studentInfo.mobile}
                        onChange={(e) => setStudentInfo({ ...studentInfo, mobile: e.target.value })}
                        className={`w-full pl-10 md:pl-12 pr-4 md:pr-6 py-3 md:py-4 text-base md:text-lg border-2 rounded-lg md:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                          errors.mobile ? 'border-red-300' : 'border-gray-200'
                        }`}
                        placeholder="Enter your mobile number"
                      />
                    </div>
                    {errors.mobile && <p className="text-red-500 text-sm md:text-base mt-1 md:mt-2">{errors.mobile}</p>}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4 md:pt-6">
                    <button
                      type="button"
                      onClick={() => setShowStudentForm(false)}
                      className="flex-1 px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border-2 border-gray-300 text-gray-700 rounded-lg md:rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg md:rounded-xl hover:from-indigo-700 hover:to-purple-700 font-semibold transition-colors shadow-lg"
                    >
                      Start Quiz
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Quiz Setup */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 border border-white/50">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center">North Gate Institution</h2>

              {/* Quiz Type Selection */}
              <div className="mb-8 md:mb-10">
                <label className="block text-xl md:text-2xl font-semibold text-gray-700 mb-4 md:mb-6">
                  Choose Quiz Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <button
                    onClick={() => setQuizType('short')}
                    className={`group p-4 md:p-6 lg:p-8 border rounded-xl md:rounded-2xl transition-all hover:scale-105 ${
                      quizType === 'short'
                        ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-3 md:mb-4">
                      <div className={`p-2 md:p-3 lg:p-4 rounded-full ${
                        quizType === 'short' ? 'bg-indigo-500' : 'bg-gray-100 group-hover:bg-indigo-500'
                      }`}>
                        <BookOpen className={`h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 ${
                          quizType === 'short' ? 'text-white' : 'text-gray-600 group-hover:text-white'
                        }`} />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-1 md:mb-2">Quick Test</div>
                      <div className="text-sm md:text-base lg:text-lg text-gray-600">20 Questions • 30 Minutes</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setQuizType('full')}
                    className={`group p-4 md:p-6 lg:p-8 border rounded-xl md:rounded-2xl transition-all hover:scale-105 ${
                      quizType === 'full'
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-3 md:mb-4">
                      <div className={`p-2 md:p-3 lg:p-4 rounded-full ${
                        quizType === 'full' ? 'bg-purple-500' : 'bg-gray-100 group-hover:bg-purple-500'
                      }`}>
                        <Trophy className={`h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 ${
                          quizType === 'full' ? 'text-white' : 'text-gray-600 group-hover:text-white'
                        }`} />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-1 md:mb-2">Full Test</div>
                      <div className="text-sm md:text-base lg:text-lg text-gray-600">100 Questions • 3 Hours</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Dynamic Categories - Enhanced Comprehensive Style */}
              <div className="mb-8 md:mb-10">
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3">Select Subject Category</h3>
                  <p className="text-sm md:text-base lg:text-lg text-gray-600">Choose from our comprehensive collection of subjects</p>
                  <div className="w-16 md:w-20 lg:w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-3 md:mt-4 rounded-full"></div>
                </div>

                {categories.length === 0 ? (
                  <div className="text-center py-8 md:py-10 lg:py-12">
                    <div className="animate-pulse">
                      <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-indigo-100 rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 text-indigo-500" />
                      </div>
                      <p className="text-base md:text-lg lg:text-xl text-gray-500">Loading categories...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 md:space-y-8 lg:space-y-10">
                    {Array.from(new Set(categories.map(c => c.type))).map((type, typeIndex) => {
                      // Fix the type error by ensuring type is treated as a string
                      const typeString = type as string;
                      
                      return (
                        <div key={typeString} className="relative">
                          {/* Category Type Header */}
                          <div className="flex items-center mb-4 md:mb-6">
                            <div className={`p-2 md:p-3 rounded-full mr-3 md:mr-4 ${
                              typeString === 'subject' ? 'bg-blue-100' :
                              typeString === 'competitive' ? 'bg-purple-100' : 'bg-green-100'
                            }`}>
                              <span className="text-xl md:text-2xl">
                                {typeString === 'subject' && '📚'}
                                {typeString === 'competitive' && '🏆'}
                                {typeString !== 'subject' && typeString !== 'competitive' && '🔹'}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
                                {typeString === 'subject' && 'Academic Subjects'}
                                {typeString === 'competitive' && 'Competitive Exams'}
                                {typeString !== 'subject' && typeString !== 'competitive' && `${typeString.charAt(0).toUpperCase()}${typeString.slice(1)} Category`}
                              </h4>
                              <p className="text-xs md:text-sm lg:text-base text-gray-600">
                                {typeString === 'subject' && 'Core academic subjects for comprehensive learning'}
                                {typeString === 'competitive' && 'Preparation for competitive examinations'}
                                {typeString !== 'subject' && typeString !== 'competitive' && `Specialized ${typeString} topics and assessments`}
                              </p>
                            </div>
                          </div>

                          {/* Category Cards Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {categories.filter(c => c.type === typeString).map((category, index) => (
                              <div
                                key={category.id}
                                className="group relative"
                                style={{ animationDelay: `${index * 0.1}s` }}
                              >
                                <button
                                  onClick={() => setSelectedCategory(category.id)}
                                  className={`w-full p-4 md:p-5 lg:p-6 border-2 rounded-xl md:rounded-2xl text-left transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                                    selectedCategory === category.id
                                      ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg transform scale-105'
                                      : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50'
                                  }`}
                                >
                                  {/* Selection Indicator */}
                                  {selectedCategory === category.id && (
                                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                      <svg className="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  )}

                                  {/* Category Icon */}
                                  <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl mb-3 md:mb-4 flex items-center justify-center ${
                                    selectedCategory === category.id 
                                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
                                      : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500'
                                  }`}>
                                    <span className={`text-base md:text-lg lg:text-xl ${
                                      selectedCategory === category.id 
                                        ? 'text-white' 
                                        : 'text-gray-600 group-hover:text-white'
                                    }`}>
                                      {getSubjectIcon(category.name)}
                                    </span>
                                  </div>

                                  {/* Category Name */}
                                  <h5 className={`text-base md:text-lg font-bold mb-1 md:mb-2 ${
                                    selectedCategory === category.id 
                                      ? 'text-indigo-700' 
                                      : 'text-gray-800 group-hover:text-indigo-700'
                                  }`}>
                                    {category.name}
                                  </h5>

                                  {/* Category Description */}
                                  <p className="text-xs md:text-sm text-gray-600">
                                    {getSubjectDescription(category.name, typeString)}
                                  </p>

                                  {/* Hover Effect Border */}
                                  <div className={`absolute inset-0 rounded-xl md:rounded-2xl transition-opacity ${
                                    selectedCategory === category.id 
                                      ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10' 
                                      : 'bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5'
                                  }`}></div>
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Separator Line */}
                          {typeIndex < Array.from(new Set(categories.map(c => c.type))).length - 1 && (
                            <div className="mt-6 md:mt-8 lg:mt-10 flex items-center">
                              <div className="flex-1 border-t border-gray-200"></div>
                              <div className="px-3 md:px-4 text-xs md:text-sm text-gray-500 bg-gray-50 rounded-full py-1">
                                More Categories
                              </div>
                              <div className="flex-1 border-t border-gray-200"></div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Start Button */}
              <div className="text-center">
                <button
                  onClick={handleStartQuiz}
                  disabled={!selectedCategory}
                  className="px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-6 text-base md:text-lg lg:text-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl md:rounded-2xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:scale-105"
                >
                  🚀 Launch Quiz
                </button>

                {selectedCategory && (
                  <div className="mt-4 md:mt-6 p-4 md:p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg md:rounded-xl border border-green-200 text-sm md:text-base lg:text-lg">
                    <strong className="text-base md:text-lg lg:text-xl">Ready to Start:</strong> {categories.find(c => c.id === selectedCategory)?.name} •{' '}
                    {quizType === 'short' ? '20 Questions / 30 Minutes' : '100 Questions / 3 Hours'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-up {
          animation: scale-up 0.2s ease-out;
        }
      `}</style>
    </Layout>
  )
}