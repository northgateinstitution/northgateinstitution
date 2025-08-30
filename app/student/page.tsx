'use client'

import { useState, useEffect } from 'react'
import { Category, QuizAttempt } from '@/types'
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Trophy, 
  Target,
  ArrowRight,
  Star,
  Award,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function StudentDashboard() {
  const [categories, setCategories] = useState<Category[]>([])
  const [recentAttempts, setRecentAttempts] = useState<QuizAttempt[]>([])
  const [stats, setStats] = useState({
    totalAttempts: 0,
    averageScore: 0,
    totalTimeSpent: 0,
    bestScore: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch categories
      const categoriesResponse = await fetch('/api/categories')
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)
      }

      // Fetch recent attempts
      const attemptsResponse = await fetch('/api/quiz-attempts')
      if (attemptsResponse.ok) {
        const attemptsData = await attemptsResponse.json()
        setRecentAttempts(attemptsData.slice(0, 5))
        
        // Calculate stats
        if (attemptsData.length > 0) {
          const totalScore = attemptsData.reduce((sum: number, attempt: QuizAttempt) => sum + attempt.score, 0)
          const totalTime = attemptsData.reduce((sum: number, attempt: QuizAttempt) => sum + attempt.time_taken, 0)
          const bestScore = Math.max(...attemptsData.map((attempt: QuizAttempt) => attempt.score))
          
          setStats({
            totalAttempts: attemptsData.length,
            averageScore: totalScore / attemptsData.length,
            totalTimeSpent: totalTime,
            bestScore
          })
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hrs > 0) {
      return `${hrs}h ${mins}m`
    }
    return `${mins}m`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="student" />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="student" userName="Student" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Learning Dashboard</h1>
          <p className="text-gray-600">Track your progress and challenge yourself with new quizzes</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Attempts</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalAttempts}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-3xl font-bold text-green-600">{Math.round(stats.averageScore)}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Best Score</p>
                <p className="text-3xl font-bold text-purple-600">{Math.round(stats.bestScore)}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Spent</p>
                <p className="text-3xl font-bold text-orange-600">{formatTime(stats.totalTimeSpent)}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/solve" className="group">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white hover:from-blue-600 hover:to-blue-700 transition-all group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8" />
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-2">Start Quiz</h3>
              <p className="text-blue-100">Challenge yourself with new questions</p>
            </div>
          </Link>
          
          <Link href="/student/materials" className="group">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white hover:from-purple-600 hover:to-purple-700 transition-all group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-8 w-8" />
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-2">Study Materials</h3>
              <p className="text-purple-100">Access notes and study guides</p>
            </div>
          </Link>
          
          <Link href="/student/progress" className="group">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white hover:from-green-600 hover:to-green-700 transition-all group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8" />
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-2">View Progress</h3>
              <p className="text-green-100">Track your learning journey</p>
            </div>
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Available Categories</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <div className="font-medium text-gray-800">{category.name}</div>
                    <div className="text-sm text-gray-500 capitalize">{category.type}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.type === 'subject' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {category.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/solve" className="block mt-4">
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                Start Practice
              </button>
            </Link>
          </div>

          {/* Recent Attempts */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            {recentAttempts.length > 0 ? (
              <div className="space-y-3">
                {recentAttempts.map((attempt) => (
                  <div key={attempt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-800">{attempt.categories?.name}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(attempt.completed_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        attempt.score >= 80 ? 'text-green-600' : 
                        attempt.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {Math.round(attempt.score)}%
                      </div>
                      <div className="text-xs text-gray-500">{formatTime(attempt.time_taken)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Trophy className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No quiz attempts yet</p>
                <p className="text-sm">Start your first quiz to see your progress here!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}