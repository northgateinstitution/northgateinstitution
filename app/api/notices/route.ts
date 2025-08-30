// app/api/notices/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Notice } from '@/types'

// Create admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const { data, error, count } = await supabaseAdmin
      .from('notices')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: `Failed to fetch notices: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [], {
      headers: {
        'X-Total-Count': count?.toString() || '0',
      },
    })

  } catch (error) {
    console.error('Get notices error:', error)
    return NextResponse.json(
      { error: 'Internal server error while fetching notices' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, file_url, file_name, file_type, file_size } = body

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    if (title.length > 255) {
      return NextResponse.json(
        { error: 'Title must be 255 characters or less' },
        { status: 400 }
      )
    }

    // Insert notice into database
    const noticeData: Partial<Notice> = {
      title: title.trim(),
      content: content.trim(),
      file_url: file_url || null,
      file_name: file_name || null,
      file_type: file_type || null,
      file_size: file_size || null,
    }

    const { data, error } = await supabaseAdmin
      .from('notices')
      .insert([noticeData])
      .select()
      .single()

    if (error) {
      console.error('Database insert error:', error)
      return NextResponse.json(
        { error: `Failed to create notice: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Notice created successfully'
    })

  } catch (error) {
    console.error('Create notice error:', error)
    return NextResponse.json(
      { error: 'Internal server error while creating notice' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, content, file_url, file_name, file_type, file_size } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Notice ID is required' },
        { status: 400 }
      )
    }

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const updateData: Partial<Notice> = {
      title: title.trim(),
      content: content.trim(),
      file_url: file_url || null,
      file_name: file_name || null,
      file_type: file_type || null,
      file_size: file_size || null,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('notices')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database update error:', error)
      return NextResponse.json(
        { error: `Failed to update notice: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Notice updated successfully'
    })

  } catch (error) {
    console.error('Update notice error:', error)
    return NextResponse.json(
      { error: 'Internal server error while updating notice' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Notice ID is required' },
        { status: 400 }
      )
    }

    // First get the notice to check if it has a file
    const { data: notice, error: fetchError } = await supabaseAdmin
      .from('notices')
      .select('file_url')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error fetching notice:', fetchError)
      return NextResponse.json(
        { error: `Failed to fetch notice: ${fetchError.message}` },
        { status: 500 }
      )
    }

    // Delete the notice from database
    const { error: deleteError } = await supabaseAdmin
      .from('notices')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Database delete error:', deleteError)
      return NextResponse.json(
        { error: `Failed to delete notice: ${deleteError.message}` },
        { status: 500 }
      )
    }

    // If notice had a file, try to delete it from storage
    if (notice?.file_url) {
      try {
        const filePath = notice.file_url.split('/').pop()
        if (filePath) {
          await supabaseAdmin.storage
            .from('notice-files')
            .remove([`notices/${filePath}`])
        }
      } catch (fileError) {
        console.error('File deletion error:', fileError)
        // Don't fail the entire operation if file deletion fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Notice deleted successfully'
    })

  } catch (error) {
    console.error('Delete notice error:', error)
    return NextResponse.json(
      { error: 'Internal server error while deleting notice' },
      { status: 500 }
    )
  }
}