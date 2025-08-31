import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(request.url)
    const attemptId = searchParams.get('attemptId')
    
    if (attemptId) {
      // Get specific attempt
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select(`
          *,
          categories (
            id,
            name,
            type
          )
        `)
        .eq('id', attemptId)
        .single()

      if (error) {
        return NextResponse.json({ error: 'Failed to fetch quiz attempt' }, { status: 500 })
      }

      return NextResponse.json(data)
    } else {
      // Get all attempts
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select(`
          *,
          categories (
            id,
            name,
            type
          )
        `)
        .order('completed_at', { ascending: false })

      if (error) {
        return NextResponse.json({ error: 'Failed to fetch quiz attempts' }, { status: 500 })
      }

      return NextResponse.json(data || [])
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert([body])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to save quiz attempt' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}