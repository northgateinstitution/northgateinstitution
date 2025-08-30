import { useState, useEffect } from 'react';
import { Category, Question, QuizAttempt } from '../types';
import { supabase } from '../lib/supabase';

interface Props {
  categories: Category[];
  onCategoriesUpdate: () => void;
}

export default function AdminDashboard({ categories, onCategoriesUpdate }: Props) {
  const [activeTab, setActiveTab] = useState<'questions' | 'categories' | 'results'>('questions');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {
    fetchQuestions();
    fetchAttempts();
  }, []);

  const fetchQuestions = async () => {
    const { data } = await supabase
      .from('questions')
      .select(`
        *,
        categories (
          name,
          type
        )
      `)
      .order('created_at', { ascending: false });
    setQuestions(data || []);
  };

  const fetchAttempts = async () => {
    const { data } = await supabase
      .from('quiz_attempts')
      .select(`
        *,
        categories (
          name,
          type
        )
      `)
      .order('score', { ascending: false });
    setAttempts(data || []);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
        <div className="flex space-x-4">
          {[
            { key: 'questions', label: 'Manage Questions', icon: '❓' },
            { key: 'categories', label: 'Manage Categories', icon: '📁' },
            { key: 'results', label: 'Student Results', icon: '📊' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Tab */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
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
                    <th className="text-left py-3 px-4 font-semibold">Question</th>
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Difficulty</th>
                    <th className="text-left py-3 px-4 font-semibold">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) => (
                    <tr key={question.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="max-w-xs truncate">{question.question}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm">
                          {question.categories?.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 capitalize">{question.question_type}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {question.difficulty}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold">{question.correct_answer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Question Modal */}
          {showAddQuestion && (
            <AddQuestionModal
              categories={categories}
              onClose={() => setShowAddQuestion(false)}
              onSuccess={() => {
                setShowAddQuestion(false);
                fetchQuestions();
              }}
            />
          )}
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
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
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Subjects</h4>
                <div className="space-y-2">
                  {categories.filter(c => c.type === 'subject').map(category => (
                    <div key={category.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-blue-800">{category.name}</span>
                        <span className="text-sm text-blue-600">Subject</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Competitive Exams</h4>
                <div className="space-y-2">
                  {categories.filter(c => c.type === 'competitive').map(category => (
                    <div key={category.id} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-purple-800">{category.name}</span>
                        <span className="text-sm text-purple-600">Competitive</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Add Category Modal */}
          {showAddCategory && (
            <AddCategoryModal
              onClose={() => setShowAddCategory(false)}
              onSuccess={() => {
                setShowAddCategory(false);
                onCategoriesUpdate();
              }}
            />
          )}
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Student Results (Ranked)</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold">Student</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Category</th>
                  <th className="text-left py-3 px-4 font-semibold">Quiz Type</th>
                  <th className="text-left py-3 px-4 font-semibold">Score</th>
                  <th className="text-left py-3 px-4 font-semibold">Accuracy</th>
                  <th className="text-left py-3 px-4 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((attempt, index) => (
                  <tr key={attempt.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {index < 3 && (
                          <span className="mr-2">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </span>
                        )}
                        #{index + 1}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{attempt.student_name}</td>
                    <td className="py-3 px-4 text-gray-600">{attempt.student_email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm">
                        {attempt.categories?.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 capitalize">
                      <span className={`px-2 py-1 rounded text-sm ${
                        attempt.quiz_type === 'full' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {attempt.quiz_type} ({attempt.total_questions}Q)
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-lg">{Math.round(attempt.score)}%</div>
                    </td>
                    <td className="py-3 px-4">{Math.round(attempt.accuracy)}%</td>
                    <td className="py-3 px-4">
                      {Math.floor(attempt.time_taken / 60)}:{(attempt.time_taken % 60).toString().padStart(2, '0')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
        <p className="text-gray-600">Great job, {attempt.student_name}! Here are your results.</p>
      </div>

      {/* Score Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-indigo-600 mb-2">
            {Math.round(attempt.score)}%
          </div>
          <div className={`inline-flex px-4 py-2 rounded-full text-lg font-semibold ${getGradeColor(attempt.score)}`}>
            Grade: {getGrade(attempt.score)}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-800">{attempt.correct_answers}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-800">{attempt.wrong_answers}</div>
            <div className="text-sm text-gray-600">Incorrect</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-800">{Math.round(attempt.accuracy)}%</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-800">{formatTime(attempt.time_taken)}</div>
            <div className="text-sm text-gray-600">Time Taken</div>
          </div>
        

export interface Question {
  id: string;
  category_id: string;
  question: string;
  question_type: 'text' | 'mathematical';
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  student_name: string;
  student_email: string;
  category_id: string;
  quiz_type: 'short' | 'full';
  total_questions: number;
  correct_answers: number;
  wrong_answers: number;
  time_taken: number;
  score: number;
  accuracy: number;
  started_at: string;
  completed_at: string;
  categories?: Category;
}

export interface QuizAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_answer: 'A' | 'B' | 'C' | 'D';
  is_correct: boolean;
}