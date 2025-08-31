'use client'

import { useState, useEffect, useCallback } from 'react'
import { Question, Category } from '@/types'
import { supabase } from '@/lib/supabase'
import { AddQuestionModal } from '@/components/AddQuestionModal'
import { BookOpen, Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import Navbar from '@/components/Navbar'

// Create a new type that includes the joined category data
interface QuestionWithCategory extends Question {
  categories?: Category
}

export default function AdminQuestions() {
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<QuestionWithCategory | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [loading, setLoading] = useState(true)
  const [serialNumbers, setSerialNumbers] = useState<Record<string, number>>({})

  const fetchQuestions = useCallback(async () => {
    const { data } = await supabase
      .from('questions')
      .select(`
        *,
        categories (
          name,
          type
        )
      `)
      .order('created_at', { ascending: false })
    
    setQuestions(data || [])
  }, [])

  const fetchCategories = useCallback(async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    setCategories(data || [])
  }, [])

  const fetchData = useCallback(async () => {
    await Promise.all([fetchQuestions(), fetchCategories()])
    setLoading(false)
  }, [fetchQuestions, fetchCategories])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Calculate serial numbers by category
  useEffect(() => {
    if (questions.length > 0) {
      const serialMap: Record<string, number> = {}
      const categoryCount: Record<string, number> = {}
      
      // First pass: count questions in each category
      questions.forEach(question => {
        const categoryId = question.category_id
        categoryCount[categoryId] = (categoryCount[categoryId] || 0) + 1
      })
      
      // Second pass: assign serial numbers
      questions.forEach(question => {
        const categoryId = question.category_id
        if (!serialMap[question.id]) {
          serialMap[question.id] = (serialMap[categoryId] || 0) + 1
          serialMap[categoryId] = serialMap[question.id]
        }
      })
      
      setSerialNumbers(serialMap)
    }
  }, [questions])

  const handleDeleteQuestion = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', id)
      
      if (!error) {
        fetchQuestions()
      }
    }
  }

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || question.category_id === selectedCategory
    const matchesDifficulty = !selectedDifficulty || question.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userRole="admin" />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Question Bank</h1>
          <p className="text-gray-600">Manage all questions and their categories</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Questions</p>
                <p className="text-3xl font-bold text-gray-900">{questions.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Easy</p>
                <p className="text-3xl font-bold text-green-600">
                  {questions.filter(q => q.difficulty === 'easy').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">E</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Medium</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {questions.filter(q => q.difficulty === 'medium').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hard</p>
                <p className="text-3xl font-bold text-red-600">
                  {questions.filter(q => q.difficulty === 'hard').length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">H</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">All Questions</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="h-5 w-5" />
            <span>Add Question</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.type})
                </option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Showing {filteredQuestions.length} of {questions.length} questions
              </span>
            </div>
          </div>
        </div>

        {/* Questions Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">SL No.</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Question</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Difficulty</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Answer</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">
                      {serialNumbers[question.id] || '-'}
                    </td>
                    <td className="py-4 px-6">
                      <div className="max-w-md">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {question.question}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {question.categories?.name}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-600 capitalize">
                        {question.question_type}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        question.difficulty === 'easy' 
                          ? 'bg-green-100 text-green-800'
                          : question.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">
                        {question.correct_answer}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingQuestion(question)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit question"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete question"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedCategory || selectedDifficulty
                  ? 'Try adjusting your filters to find questions.'
                  : 'Get started by adding your first question.'}
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
              >
                Add First Question
              </button>
            </div>
          )}
        </div>

        {/* Modals */}
        {showAddModal && (
          <AddQuestionModal
            categories={categories}
            onClose={() => setShowAddModal(false)}
            onSuccess={() => {
              setShowAddModal(false)
              fetchQuestions()
            }}
          />
        )}

        {editingQuestion && (
          <AddQuestionModal
            categories={categories}
            question={editingQuestion}
            onClose={() => setEditingQuestion(null)}
            onSuccess={() => {
              setEditingQuestion(null)
              fetchQuestions()
            }}
          />
        )}
      </div>
    </div>
  )
}