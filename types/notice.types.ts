export interface Notice {
  id: string
  title: string
  description?: string
  content?: string
  type: 'text' | 'image' | 'pdf'
  file_url?: string
  file_type?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  is_active: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export interface CreateNoticeData {
  title: string
  description?: string
  content?: string
  type: 'text' | 'image' | 'pdf'
  file_url?: string
  file_type?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

