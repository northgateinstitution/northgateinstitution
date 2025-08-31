'use client'

import { useState, useEffect, useCallback } from 'react'
import { QuizAttempt, Question } from '@/types'
import { 
  Trophy, 
  Clock, 
  Target, 
  Users, 
  Award, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  XCircle,
  Eye,
  Share2,
  Download
} from 'lucide-react'

interface Props {
  attemptId: string
  questions: Question[]
  selectedAnswers: {[key: string]: string}
  onRestart: () => void
}

interface RankData {
  rank: number
  totalAttempts: number
  percentile: number
}

export default function QuizResult({ attemptId, questions, selectedAnswers, onRestart }: Props) {
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null)
  const [rankData, setRankData] = useState<RankData>({ rank: 0, totalAttempts: 0, percentile: 0 })
  const [loading, setLoading] = useState(true)
  const [showDetailedReview, setShowDetailedReview] = useState(false)
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const fetchResults = useCallback(async () => {
    try {
      // Fetch attempt details
      const response = await fetch(`/api/quiz-attempts?attemptId=${attemptId}`)
      if (response.ok) {
        const attemptData = await response.json()
        setAttempt(attemptData)
        
        // Calculate rank and percentile
        const rankResponse = await fetch(`/api/quiz-attempts`)
        if (rankResponse.ok) {
          const allAttempts = await rankResponse.json()
          
          // Filter attempts for same category and quiz type
          const categoryAttempts = allAttempts.filter(
            (a: QuizAttempt) => 
              a.category_id === attemptData.category_id && 
              a.quiz_type === attemptData.quiz_type
          ).sort((a: QuizAttempt, b: QuizAttempt) => b.score - a.score)
          
          const userRank = categoryAttempts.findIndex((a: QuizAttempt) => a.id === attemptId) + 1
          const totalAttempts = categoryAttempts.length
          const percentile = Math.round(((totalAttempts - userRank) / totalAttempts) * 100)
          
          setRankData({
            rank: userRank,
            totalAttempts,
            percentile
          })
        }
      }
    } catch (error) {
      console.error('Error fetching results:', error)
    } finally {
      setLoading(false)
    }
  }, [attemptId])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`
    }
    return `${mins}m ${secs}s`
  }

  const getGradeColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 border-green-200'
    if (score >= 75) return 'text-blue-600 bg-blue-100 border-blue-200'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 border-yellow-200'
    return 'text-red-600 bg-red-100 border-red-200'
  }

  const getGrade = (score: number) => {
    if (score >= 90) return 'A+'
    if (score >= 80) return 'A'
    if (score >= 70) return 'B+'
    if (score >= 60) return 'B'
    if (score >= 50) return 'C'
    return 'F'
  }

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! You\'re a star! 🌟'
    if (score >= 80) return 'Excellent work! Keep it up! 🎉'
    if (score >= 70) return 'Good job! You\'re on the right track! 👍'
    if (score >= 60) return 'Not bad! There\'s room for improvement! 📚'
    if (score >= 50) return 'Keep practicing! You\'ll get better! 💪'
    return 'Don\'t give up! Practice makes perfect! 🎯'
  }

  const shareResults = async () => {
    if (!attempt) return; // Early return if attempt is null
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Quiz Results',
          text: `I just scored ${Math.round(attempt.score)}% in ${attempt.categories?.name} quiz! 🎯`,
          url: window.location.href,
        })
      } catch {
        // Fallback to clipboard
        navigator.clipboard.writeText(
          `I just scored ${Math.round(attempt.score)}% in ${attempt.categories?.name} quiz! Check out the quiz platform: ${window.location.origin}`
        )
        alert('Results copied to clipboard!')
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `I just scored ${Math.round(attempt.score)}% in ${attempt.categories?.name} quiz! Check out the quiz platform: ${window.location.origin}`
      )
      alert('Results copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your results...</p>
        </div>
      </div>
    )
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Unable to load results</p>
          <button
            onClick={onRestart}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4 shadow-lg">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Noth Gate Institution
          </h2>
          <h3 className="text-6x1 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Quiz Completed!
          </h3>
          <p className="text-xl text-gray-600">{getPerformanceMessage(attempt.score)}</p>
          <p className="text-gray-500 mt-2">Great job, {attempt.student_name}!</p>
        </div>

        {/* Main Score Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="text-8xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {Math.round(attempt.score)}%
            </div>
            <div className={`inline-flex px-6 py-3 rounded-full text-xl font-bold border-2 ${getGradeColor(attempt.score)}`}>
              Grade: {getGrade(attempt.score)}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-700">{attempt.correct_answers}</div>
              <div className="text-sm text-green-600 font-medium">Correct</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border border-red-200">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">✕</span>
              </div>
              <div className="text-3xl font-bold text-red-700">{attempt.wrong_answers}</div>
              <div className="text-sm text-red-600 font-medium">Incorrect</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-700">{Math.round(attempt.accuracy)}%</div>
              <div className="text-sm text-blue-600 font-medium">Accuracy</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-700">{formatTime(attempt.time_taken)}</div>
              <div className="text-sm text-purple-600 font-medium">Time Taken</div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats and Rank Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                📋
              </div>
              Quiz Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Category:</span>
                <span className="font-bold text-gray-800">{attempt.categories?.name}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Quiz Type:</span>
                <span className="font-bold text-gray-800 capitalize">
                  {attempt.quiz_type} ({attempt.total_questions} Questions)
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Date:</span>
                <span className="font-bold text-gray-800">
                  {new Date(attempt.completed_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-medium">Time:</span>
                <span className="font-bold text-gray-800">
                  {new Date(attempt.completed_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              Your Rank & Performance
            </h3>
            <div className="text-center mb-6">
              <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                #{rankData.rank}
              </div>
              <div className="text-gray-600 text-lg mb-4">out of {rankData.totalAttempts} participants</div>
              
              <div className="bg-gray-100 rounded-full h-6 overflow-hidden mb-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-6 rounded-full transition-all duration-1000 flex items-center justify-center"
                  style={{ width: `${rankData.percentile}%` }}
                >
                  <span className="text-white text-xs font-bold">{rankData.percentile}%</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-purple-700">{rankData.percentile}th</div>
                  <div className="text-sm text-purple-600">Percentile</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-indigo-700">
                    {rankData.rank <= rankData.totalAttempts * 0.1 ? 'Top 10%' : 
                     rankData.rank <= rankData.totalAttempts * 0.25 ? 'Top 25%' : 
                     rankData.rank <= rankData.totalAttempts * 0.5 ? 'Top 50%' : 'Bottom 50%'}
                  </div>
                  <div className="text-sm text-indigo-600">Performance</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <Eye className="h-8 w-8 text-indigo-600 mr-3" />
              Detailed Review
            </h3>
            <button
              onClick={() => setShowDetailedReview(!showDetailedReview)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <span>{showDetailedReview ? 'Hide' : 'Show'} Details</span>
              {showDetailedReview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {showDetailedReview && (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id]
                const isCorrect = userAnswer === question.correct_answer
                const isExpanded = expandedQuestion === question.id

                return (
                  <div key={question.id} className={`border-2 rounded-xl transition-all ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div 
                      className="p-4 cursor-pointer hover:bg-opacity-80 transition-colors"
                      onClick={() => setExpandedQuestion(isExpanded ? null : question.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="flex-shrink-0">
                              {isCorrect ? (
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              ) : (
                                <XCircle className="h-6 w-6 text-red-600" />
                              )}
                            </span>
                            <span className="text-sm font-medium text-gray-600">Question {index + 1}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                              question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {question.difficulty}
                            </span>
                          </div>
                          <div className="text-gray-800 font-medium line-clamp-2">
                            {question.question}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <div className={`text-sm font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </div>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-200 bg-white bg-opacity-50">
                        <div className="pt-4">
                          <div className="text-gray-800 font-medium mb-4">{question.question}</div>
                          
                          <div className="grid gap-3">
                            {['A', 'B', 'C', 'D'].map((option) => {
                              const optionText = question[`option_${option.toLowerCase()}` as keyof Question] as string
                              const isUserChoice = userAnswer === option
                              const isCorrectAnswer = question.correct_answer === option
                              
                              return (
                                <div
                                  key={option}
                                  className={`p-3 rounded-lg border-2 flex items-start space-x-3 ${
                                    isCorrectAnswer && isUserChoice
                                      ? 'border-green-500 bg-green-100' // Correct choice
                                      : isCorrectAnswer
                                      ? 'border-green-500 bg-green-50' // Correct answer (not chosen)
                                      : isUserChoice
                                      ? 'border-red-500 bg-red-100' // Wrong choice
                                      : 'border-gray-200 bg-gray-50' // Not chosen
                                  }`}
                                >
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                    isCorrectAnswer && isUserChoice
                                      ? 'bg-green-600 text-white'
                                      : isCorrectAnswer
                                      ? 'bg-green-600 text-white'
                                      : isUserChoice
                                      ? 'bg-red-600 text-white'
                                      : 'bg-gray-300 text-gray-600'
                                  }`}>
                                    {option}
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-gray-800">{optionText}</div>
                                    <div className="flex items-center space-x-2 mt-1">
                                      {isCorrectAnswer && (
                                        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-medium">
                                          ✓ Correct Answer
                                        </span>
                                      )}
                                      {isUserChoice && !isCorrectAnswer && (
                                        <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full font-medium">
                                          Your Choice
                                        </span>
                                      )}
                                      {isUserChoice && isCorrectAnswer && (
                                        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full font-medium">
                                          ✓ Your Correct Choice
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          {question.explanation && (
                            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                                  <span className="text-blue-600 text-sm">💡</span>
                                </div>
                                <div>
                                  <div className="font-medium text-blue-800 text-sm mb-1">Explanation:</div>
                                  <div className="text-blue-700 text-sm leading-relaxed">{question.explanation}</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Enhanced Actions */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRestart}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Take Another Quiz</span>
            </button>
            
            <button
              onClick={shareResults}
              className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl hover:from-green-700 hover:to-blue-700 font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Share2 className="h-5 w-5" />
              <span>Share Achievement</span>
            </button>
            
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="h-5 w-5" />
              <span>Download Results</span>
            </button>
          </div>
          
          {/* Achievement Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {attempt.score >= 90 && (
              <div className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium">
                <span>🏆</span>
                <span>Excellence Award</span>
              </div>
            )}
            {attempt.score >= 80 && (
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                <span>⭐</span>
                <span>High Achiever</span>
              </div>
            )}
            {rankData.rank <= Math.ceil(rankData.totalAttempts * 0.1) && (
              <div className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                <span>🎯</span>
                <span>Top 10%</span>
              </div>
            )}
            {attempt.time_taken <= (attempt.quiz_type === 'short' ? 1200 : 7200) && (
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                <span>⚡</span>
                <span>Speed Master</span>
              </div>
            )}
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mt-8">
            <p className="text-lg text-gray-700 mb-2">
              🎉 <strong>Congratulations on completing the quiz!</strong>
            </p>
            <p className="text-gray-600">
              Share your achievement with friends and keep practicing to improve your score! 
              Your dedication to learning is commendable. 🚀
            </p>
            <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-500">
              <span>💪 Keep Learning</span>
              <span>📈 Track Progress</span>
              <span>🏆 Achieve Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}