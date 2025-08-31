'use client'

import { useState, useEffect } from 'react'
import { Category, Question } from '@/types'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { X } from 'lucide-react'

interface AddQuestionModalProps {
  categories: Category[]
  question?: Question
  onClose: () => void
  onSuccess: () => void
}

type QuestionType = 'text' | 'mathematical'
type Difficulty = 'easy' | 'medium' | 'hard'
type CorrectAnswer = 'A' | 'B' | 'C' | 'D'

export function AddQuestionModal({ categories, question, onClose, onSuccess }: AddQuestionModalProps) {
  const [formData, setFormData] = useState({
    question: '',
    category_id: '',
    question_type: 'text' as QuestionType,
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 'A' as CorrectAnswer,
    explanation: '',
    difficulty: 'medium' as Difficulty
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (question) {
      setFormData({
        question: question.question,
        category_id: String(question.category_id),
        question_type: question.question_type as QuestionType,
        option_a: question.option_a || '',
        option_b: question.option_b || '',
        option_c: question.option_c || '',
        option_d: question.option_d || '',
        correct_answer: question.correct_answer as CorrectAnswer,
        explanation: question.explanation || '',
        difficulty: question.difficulty as Difficulty
      })
    }
  }, [question])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.category_id) {
      toast.error('Please select a category')
      return
    }
    if (!formData.question.trim()) {
      toast.error('Please enter a question')
      return
    }
    if (!formData.option_a.trim() || !formData.option_b.trim() || 
        !formData.option_c.trim() || !formData.option_d.trim()) {
      toast.error('Please fill in all options')
      return
    }

    setIsSubmitting(true)
    
    try {
      if (question) {
        const { error } = await supabase
          .from('questions')
          .update(formData)
          .eq('id', question.id)
        if (error) throw error
        toast.success('Question updated successfully!')
      } else {
        const { error } = await supabase
          .from('questions')
          .insert([formData])
        if (error) throw error
        toast.success('Question added successfully!')
      }
      onSuccess()
      onClose()
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'An error occurred')
      } else {
        toast.error('An unexpected error occurred')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as QuestionType
    setFormData(prev => ({ ...prev, question_type: value }))
  }

  const handleCorrectAnswerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as CorrectAnswer
    setFormData(prev => ({ ...prev, correct_answer: value }))
  }

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Difficulty
    setFormData(prev => ({ ...prev, difficulty: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            {question ? 'Edit Question' : 'Add New Question'}
          </h3>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Category & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                required
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                disabled={isSubmitting}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.type})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
              <select
                value={formData.question_type}
                onChange={handleQuestionTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                disabled={isSubmitting}
              >
                <option value="text">Textual</option>
                <option value="mathematical">Mathematical</option>
              </select>
            </div>
          </div>

          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
            <textarea
              required
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              rows={3}
              placeholder="Enter your question here..."
              disabled={isSubmitting}
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(['option_a', 'option_b', 'option_c', 'option_d'] as const).map((opt, idx) => (
              <div key={opt}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Option {String.fromCharCode(65 + idx)} *
                </label>
                <input
                  type="text"
                  required
                  value={formData[opt]}
                  onChange={(e) => setFormData({ ...formData, [opt]: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder={`Enter option ${String.fromCharCode(65 + idx)}`}
                  disabled={isSubmitting}
                />
              </div>
            ))}
          </div>

          {/* Correct Answer & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer *</label>
              <select
                value={formData.correct_answer}
                onChange={handleCorrectAnswerChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                disabled={isSubmitting}
              >
                <option value="A">Option A</option>
                <option value="B">Option B</option>
                <option value="C">Option C</option>
                <option value="D">Option D</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={handleDifficultyChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                disabled={isSubmitting}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Explanation (Optional)</label>
            <textarea
              value={formData.explanation}
              onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              rows={2}
              placeholder="Explain why this answer is correct..."
              disabled={isSubmitting}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : (question ? 'Update Question' : 'Add Question')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}