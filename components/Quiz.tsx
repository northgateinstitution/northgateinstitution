'use client'

import { useState, useEffect, useCallback } from 'react'
import { Question } from '@/types'
import QuizResult from './QuizResult'
import { Clock, ArrowLeft, ArrowRight, Flag, AlertCircle } from 'lucide-react'

interface Props {
  studentName: string
  studentEmail: string
  studentMobile: string
  categoryId: string
  quizType: 'short' | 'full'
  onBack: () => void
  onComplete: (attemptId: string) => void
}

export default function Quiz({ studentName, studentEmail, studentMobile, categoryId, quizType, onBack, onComplete }: Props) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({})
  const [timeLeft, setTimeLeft] = useState(quizType === 'full' ? 180 * 60 : 30 * 60)
  const [startTime] = useState(Date.now())
  const [showResult, setShowResult] = useState(false)
  const [attemptId, setAttemptId] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await fetch(`/api/questions?categoryId=${categoryId}&quizType=${quizType}`)
      if (response.ok) {
        const data = await response.json()
        setQuestions(data)
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  }, [categoryId, quizType])

  const handleSubmitQuiz = useCallback(async () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000)
    let correctCount = 0

    // Calculate score
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct_answer) {
        correctCount++
      }
    })

    const wrongCount = questions.length - correctCount
    const accuracy = (correctCount / questions.length) * 100
    const score = (correctCount / questions.length) * 100

    // Save attempt
    try {
      const response = await fetch('/api/quiz-attempts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_name: studentName,
          student_email: studentEmail,
          student_mobile: studentMobile,
          category_id: categoryId,
          quiz_type: quizType,
          total_questions: questions.length,
          correct_answers: correctCount,
          wrong_answers: wrongCount,
          time_taken: timeTaken,
          score: score,
          accuracy: accuracy,
          started_at: new Date(startTime).toISOString(),
          completed_at: new Date().toISOString()
        }),
      })

      if (response.ok) {
        const attempt = await response.json()
        setAttemptId(attempt.id)
        setShowResult(true)
        onComplete(attempt.id)
      }
    } catch (error) {
      console.error('Error saving quiz attempt:', error)
    }
  }, [questions, selectedAnswers, startTime, studentName, studentEmail, studentMobile, categoryId, quizType, onComplete])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, handleSubmitQuiz])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questions[currentQuestionIndex].id]: answer
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getAnsweredCount = () => {
    return Object.keys(selectedAnswers).length
  }

  const getUnansweredCount = () => {
    return questions.length - getAnsweredCount()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <QuizResult 
        attemptId={attemptId} 
        questions={questions}
        selectedAnswers={selectedAnswers}
        onRestart={onBack} 
      />
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No questions available for this category</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-gray-800">Quiz in Progress</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  {getAnsweredCount()} Answered
                </span>
                {getUnansweredCount() > 0 && (
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                    {getUnansweredCount()} Remaining
                  </span>
                )}
              </div>
            </div>
            
            <div className={`text-xl font-bold flex items-center ${timeLeft < 300 ? 'text-red-600' : 'text-blue-600'}`}>
              <Clock className="h-5 w-5 mr-2" />
              {formatTime(timeLeft)}
              {timeLeft < 300 && <AlertCircle className="h-4 w-4 ml-2 animate-pulse" />}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-32">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Navigator</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionNavigation(index)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                      currentQuestionIndex === index
                        ? 'bg-indigo-600 text-white shadow-md'
                        : selectedAnswers[questions[index].id]
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-indigo-600 rounded"></div>
                  <span className="text-gray-600">Current Question</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                  <span className="text-gray-600">Not Answered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    Question {currentQuestionIndex + 1}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize">
                    {currentQuestion.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium capitalize">
                    {currentQuestion.question_type}
                  </span>
                  {selectedAnswers[currentQuestion.id] && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <Flag className="h-3 w-3 inline mr-1" />
                      Answered
                    </span>
                  )}
                </div>
                <div className="text-xl font-medium text-gray-800 leading-relaxed">
                  {currentQuestion.question}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {['A', 'B', 'C', 'D'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                      selectedAnswers[currentQuestion.id] === option
                        ? 'border-indigo-600 bg-indigo-50 shadow-md ring-2 ring-indigo-200'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg mr-4 ${
                        selectedAnswers[currentQuestion.id] === option
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {option}
                      </span>
                      <span className="text-gray-800 flex-1 mt-2 text-lg leading-relaxed">
                        {currentQuestion[`option_${option.toLowerCase()}` as keyof Question] as string}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center bg-white rounded-xl shadow-lg p-6">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Exit Quiz</span>
              </button>

              <div className="flex space-x-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowConfirmSubmit(true)}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Submit Quiz?</h3>
              <p className="text-gray-600">
                You have answered {getAnsweredCount()} out of {questions.length} questions.
                {getUnansweredCount() > 0 && (
                  <span className="block mt-2 text-orange-600 font-medium">
                    ⚠️ {getUnansweredCount()} questions are still unanswered.
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Review More
              </button>
              <button
                onClick={() => {
                  setShowConfirmSubmit(false)
                  handleSubmitQuiz()
                }}
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}