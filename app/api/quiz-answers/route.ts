import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

interface QuizAnswer {
  question_id: string
  selected_answer: string
  is_correct: boolean
}

interface QuizAnswerRequest {
  attemptId: string
  answers: QuizAnswer[]
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { attemptId, answers }: QuizAnswerRequest = await request.json()
    
    // Insert all quiz answers
    const quizAnswers = answers.map((answer: QuizAnswer) => ({
      attempt_id: attemptId,
      question_id: answer.question_id,
      selected_answer: answer.selected_answer,
      is_correct: answer.is_correct,
    }))

    const { data, error } = await supabase
      .from('quiz_answers')
      .insert(quizAnswers)
      .select()

    if (error) {
      return NextResponse.json({ error: 'Failed to save quiz answers' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    const attemptId = searchParams.get('attemptId')
    
    if (!attemptId) {
      return NextResponse.json({ error: 'Attempt ID is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('quiz_answers')
      .select(`
        *,
        questions (
          id,
          question,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_answer,
          explanation,
          difficulty
        )
      `)
      .eq('attempt_id', attemptId)
      .order('created_at', { ascending: true })

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch quiz answers' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}