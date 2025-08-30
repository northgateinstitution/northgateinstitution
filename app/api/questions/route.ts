import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const quizType = searchParams.get('quizType')
    
    let query = supabase
      .from('questions')
      .select('*')

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
    }

    let questions = data || []
    
    // Shuffle and limit based on quiz type
    if (questions.length > 0) {
      questions = questions.sort(() => Math.random() - 0.5)
      
      if (quizType === 'short') {
        questions = questions.slice(0, 20)
      } else if (quizType === 'full') {
        questions = questions.slice(0, 100)
      }
    }

    return NextResponse.json(questions)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
