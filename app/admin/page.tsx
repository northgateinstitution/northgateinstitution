'use client'

import { useState, useEffect, useCallback } from 'react'
import { Category, Question, QuizAttempt } from '../../types'
import { supabase } from '../../lib/supabase'
import { AddQuestionModal } from '../../components/AddQuestionModal'
import { AddCategoryModal } from '../../components/AddCategoryModal'
import {
  BookOpen,
  TrendingUp,
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  Users,
  Bell,
  Trash2,
} from 'lucide-react'

// Update the Question type to include categories
interface QuestionWithCategory extends Question {
  categories?: Category
}

export default function AdminDashboard() {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeTab, setActiveTab] = useState<'dashboard' | 'questions' | 'categories' | 'results' | 'notices'>('dashboard')
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([])
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])
  const [showAddQuestion, setShowAddQuestion] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [stats, setStats] = useState({
    questionsCount: 0,
    studentsCount: 0,
    noticesCount: 0,
    recentActivities: [] as (QuizAttempt & { categories?: { name: string } })[],
  })

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase.from('categories').select('*').order('name')
    setCategories(data || [])
  }, [])

  const fetchQuestions = useCallback(async () => {
    const { data } = await supabase
      .from('questions')
      .select(`*, categories ( name, type )`)
      .order('created_at', { ascending: false })
    setQuestions(data || [])
  }, [])

  const fetchAttempts = useCallback(async () => {
    const { data } = await supabase
      .from('quiz_attempts')
      .select(`*, categories ( name, type )`)
      .order('score', { ascending: false })
    setAttempts(data || [])
  }, [])

  const fetchStats = useCallback(async () => {
    const { count: questionsCount } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })

    const { count: studentsCount } = await supabase
      .from('quiz_attempts')
      .select('student_email', { count: 'exact', head: true })

    // Notices count (from notices table, adjust table name if different)
    const { count: noticesCount } = await supabase
      .from('notices')
      .select('*', { count: 'exact', head: true })

    const { data: recentActivities } = await supabase
      .from('quiz_attempts')
      .select('*, categories(name)')
      .order('created_at', { ascending: false })
      .limit(5)

    setStats({
      questionsCount: questionsCount || 0,
      studentsCount: studentsCount || 0,
      noticesCount: noticesCount || 0,
      recentActivities: (recentActivities as (QuizAttempt & { categories?: { name: string } })[]) || [],
    })
  }, [])

  const fetchDashboardData = useCallback(async () => {
    await Promise.all([fetchQuestions(), fetchAttempts(), fetchStats()])
  }, [fetchQuestions, fetchAttempts, fetchStats])

  useEffect(() => {
    fetchCategories()
    fetchDashboardData()
  }, [fetchCategories, fetchDashboardData])

  // NEW: delete a category with confirmation
  const handleDeleteCategory = async (id: string, name: string) => {
    const ok = window.confirm(`Delete category \"${name}\"?\nThis cannot be undone.`)
    if (!ok) return
    try {
      setDeletingId(id)
      const { error } = await supabase.from('categories').delete().eq('id', id)
      if (error) throw error
      await fetchCategories()
      await fetchStats()
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete category'
      alert(errorMessage)
    } finally {
      setDeletingId(null)
    }
  }

  const statCards = [
    { name: 'Total Questions', value: stats.questionsCount, icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Total Students', value: stats.studentsCount, icon: Users, color: 'bg-green-500' },
    { name: 'Notices', value: stats.noticesCount, icon: Bell, color: 'bg-purple-500' },
  ]

  // Results: delete a quiz attempt
  const handleDeleteAttempt = async (id: string) => {
    const ok = window.confirm('Delete this attempt? This cannot be undone.');
    if (!ok) return;
    try {
      setDeletingId(id);
      const { error } = await supabase.from('quiz_attempts').delete().eq('id', id);
      if (error) throw error;
      await fetchAttempts();   // refresh table
      await fetchStats();      // optional: refresh dashboard stats
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete attempt'
      alert(errorMessage)
    } finally {
      setDeletingId(null);
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-lg">
        <div className="h-16 flex items-center justify-center border-b">
          <h2 className="text-lg font-bold text-indigo-600 flex items-center space-x-2">
            <LayoutDashboard className="h-6 w-6" /> <span>Admin Panel</span>
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { key: 'questions', label: 'Questions', icon: ClipboardList },
            { key: 'categories', label: 'Categories', icon: FolderKanban },
            { key: 'results', label: 'Results', icon: Users },
            { key: 'notices', label: 'Notices', icon: Bell },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key as 'dashboard' | 'questions' | 'categories' | 'results' | 'notices')}
              className={`flex items-center w-full px-4 py-2 rounded-lg font-medium transition-all ${activeTab === item.key
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
                }`}
            >
              <item.icon className="h-5 w-5 mr-2" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {activeTab === 'dashboard' && (
          <>
           

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
              {stats.recentActivities.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.student_name}</span> completed a quiz in{' '}
                          <span className="font-medium">{activity.categories?.name}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Score: {Math.round(activity.score)}% • {new Date(activity.completed_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No recent activities</p>
              )}
            </div>
          </>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Questions Management</h3>
              <button
                onClick={() => setShowAddQuestion(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                + Add Question
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left">Question</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Difficulty</th>
                    <th className="py-3 px-4 text-left">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q) => (
                    <tr key={q.id} className="border-b hover:bg-gray-50 text-sm">
                      <td className="py-3 px-4">{q.question}</td>
                      <td className="py-3 px-4">{q.categories?.name}</td>
                      <td className="py-3 px-4 capitalize">{q.question_type}</td>
                      <td className="py-3 px-4">{q.difficulty}</td>
                      <td className="py-3 px-4 font-semibold">{q.correct_answer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {showAddQuestion && (
              <AddQuestionModal
                categories={categories}
                onClose={() => setShowAddQuestion(false)}
                onSuccess={() => {
                  setShowAddQuestion(false)
                  fetchQuestions()
                  fetchStats()
                }}
              />
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Categories Management</h3>
              <button
                onClick={() => setShowAddCategory(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                + Add Category
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Subjects</h4>
                {categories.filter(c => c.type === 'subject').map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-2 flex items-center justify-between"
                  >
                    <span className="text-blue-900 font-medium">{cat.name}</span>
                    <button
                      onClick={() => handleDeleteCategory(cat.id as string, cat.name)}
                      disabled={deletingId === cat.id}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium transition ${deletingId === cat.id
                        ? 'opacity-60 cursor-not-allowed border-red-200 text-red-400'
                        : 'hover:bg-red-50 border-red-200 text-red-600'
                        }`}
                      title="Delete category"
                    >
                      <Trash2 className="h-4 w-4" />
                      {deletingId === cat.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Competitive Exams</h4>
                {categories.filter(c => c.type === 'competitive').map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 bg-purple-50 border border-purple-200 rounded-lg mb-2 flex items-center justify-between"
                  >
                    <span className="text-purple-900 font-medium">{cat.name}</span>
                    <button
                      onClick={() => handleDeleteCategory(cat.id as string, cat.name)}
                      disabled={deletingId === cat.id}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium transition ${deletingId === cat.id
                        ? 'opacity-60 cursor-not-allowed border-red-200 text-red-400'
                        : 'hover:bg-red-50 border-red-200 text-red-600'
                        }`}
                      title="Delete category"
                    >
                      <Trash2 className="h-4 w-4" />
                      {deletingId === cat.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {showAddCategory && (
              <AddCategoryModal
                onClose={() => setShowAddCategory(false)}
                onSuccess={() => {
                  setShowAddCategory(false)
                  fetchCategories()
                  fetchStats()
                }}
              />
            )}
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-bold mb-6">Student Results</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left">Student</th>
                    <th className="py-3 px-4 text-left">Category</th>
                    <th className="py-3 px-4 text-left">Quiz Type</th>
                    <th className="py-3 px-4 text-left">Score</th>
                    <th className="py-3 px-4 text-left">Time</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((a) => (
                    <tr key={a.id} className="border-b hover:bg-gray-50 text-sm">
                      <td className="py-3 px-4">
                        <div className="font-medium">{a.student_name}</div>
                        <div className="text-xs text-gray-500">{a.student_email}</div>
                        <div className="text-xs text-gray-500">{a.student_mobile}</div>
                      </td>
                      <td className="py-3 px-4">{a.categories?.name}</td>
                      <td className="py-3 px-4">{a.quiz_type}</td>
                      <td
                        className={`py-3 px-4 font-semibold ${a.score >= 80 ? 'text-green-600' : a.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}
                      >
                        {Math.round(a.score)}%
                      </td>
                      <td className="py-3 px-4">
                        {Math.floor(a.time_taken / 60)}m {a.time_taken % 60}s
                      </td>
                      <td className="py-3 px-4">
                        {new Date(a.completed_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteAttempt(a.id as string)}
                          disabled={deletingId === a.id}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium transition ${deletingId === a.id
                              ? 'opacity-60 cursor-not-allowed border-red-200 text-red-400'
                              : 'hover:bg-red-50 border-red-200 text-red-600'
                            }`}
                          title="Delete result"
                        >
                          <Trash2 className="h-4 w-4" />
                          {deletingId === a.id ? 'Deleting…' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notices Tab */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-bold mb-6">Notices</h3>
            <p className="text-gray-500">Here you can manage and view notices (integrate supabase notices table).</p>
          </div>
        )}
      </main>
    </div>
  )
}