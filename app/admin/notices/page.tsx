'use client'

import { useState, useEffect, useRef } from 'react'
import { Notice } from '@/types'

interface FileUploadResponse {
  fileUrl: string
  directUrl: string
  fileName: string
  fileId: string
  fileType: string
  fileSize: number
  fileCategory: string
}

export default function AdminNotices() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [notices, setNotices] = useState<Notice[]>([])
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      const response = await fetch('/api/notices', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      })
      if (!response.ok) throw new Error(await response.text())
      const data = await response.json()
      setNotices(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      showMessage('Failed to load notices', 'error')
    }
  }

  const showMessage = (text: string, type: 'success' | 'error' = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 5000)
  }

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return '📎'
    if (fileType.startsWith('image/')) return '🖼️'
    if (fileType === 'application/pdf') return '📄'
    if (fileType.includes('word') || fileType.includes('document')) return '📝'
    if (fileType === 'text/plain') return '📄'
    return '📎'
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    const kb = bytes / 1024
    const mb = kb / 1024
    return mb >= 1 ? `${mb.toFixed(1)}MB` : `${kb.toFixed(1)}KB`
  }

  // Text formatting functions - using HTML tags instead of markdown
  const formatText = (format: string) => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    
    let newText = ''
    let newSelectionStart = start
    let newSelectionEnd = end

    switch (format) {
      case 'bold':
        if (selectedText) {
          newText = content.substring(0, start) + `<strong>${selectedText}</strong>` + content.substring(end)
          newSelectionStart = start + 8
          newSelectionEnd = end + 8
        } else {
          newText = content.substring(0, start) + '<strong></strong>' + content.substring(end)
          newSelectionStart = start + 8
          newSelectionEnd = start + 8
        }
        break
      case 'italic':
        if (selectedText) {
          newText = content.substring(0, start) + `<em>${selectedText}</em>` + content.substring(end)
          newSelectionStart = start + 4
          newSelectionEnd = end + 4
        } else {
          newText = content.substring(0, start) + '<em></em>' + content.substring(end)
          newSelectionStart = start + 4
          newSelectionEnd = start + 4
        }
        break
      case 'underline':
        if (selectedText) {
          newText = content.substring(0, start) + `<u>${selectedText}</u>` + content.substring(end)
          newSelectionStart = start + 3
          newSelectionEnd = end + 3
        } else {
          newText = content.substring(0, start) + '<u></u>' + content.substring(end)
          newSelectionStart = start + 3
          newSelectionEnd = start + 3
        }
        break
      case 'list-ul':
        if (selectedText) {
          const listItems = selectedText.split('\n').map(item => `<li>${item}</li>`).join('')
          newText = content.substring(0, start) + `<ul>${listItems}</ul>` + content.substring(end)
          newSelectionStart = start + 4
          newSelectionEnd = end + (listItems.length - selectedText.length) + 9
        } else {
          newText = content.substring(0, start) + '<ul><li></li></ul>' + content.substring(end)
          newSelectionStart = start + 8
          newSelectionEnd = start + 8
        }
        break
      case 'list-ol':
        if (selectedText) {
          const listItems = selectedText.split('\n').map(item => `<li>${item}</li>`).join('')
          newText = content.substring(0, start) + `<ol>${listItems}</ol>` + content.substring(end)
          newSelectionStart = start + 4
          newSelectionEnd = end + (listItems.length - selectedText.length) + 9
        } else {
          newText = content.substring(0, start) + '<ol><li></li></ol>' + content.substring(end)
          newSelectionStart = start + 8
          newSelectionEnd = start + 8
        }
        break
      default:
        return
    }
    
    setContent(newText)
    
    // Set cursor position after update
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = newSelectionStart
        textareaRef.current.selectionEnd = newSelectionEnd
        textareaRef.current.focus()
      }
    }, 0)
  }

  // Function to render HTML content safely
  const renderHtmlContent = (html: string) => {
    return { __html: html };
  };

  // CREATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      showMessage('Please fill in all required fields', 'error')
      return
    }

    setIsUploading(true)
    setMessage('')
    try {
      let uploadData: FileUploadResponse | null = null

      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const uploadResponse = await fetch('/api/upload', { method: 'POST', body: formData })
        const uploadText = await uploadResponse.text()
        if (!uploadResponse.ok) {
          try {
            const err = JSON.parse(uploadText)
            throw new Error(err.error || 'Upload failed')
          } catch {
            throw new Error(uploadText || 'Upload failed')
          }
        }
        uploadData = JSON.parse(uploadText)
      }

      const noticeData = {
        title: title.trim(),
        content: content.trim(),
        file_url: uploadData?.fileUrl || '',
        file_name: uploadData?.fileName || '',
        file_type: uploadData?.fileType || '',
        file_size: uploadData?.fileSize || 0,
      }

      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noticeData),
      })
      const responseText = await response.text()
      if (!response.ok) {
        try {
          const err = JSON.parse(responseText)
          throw new Error(err.error || 'Failed to create notice')
        } catch {
          throw new Error(responseText || 'Failed to create notice')
        }
      }

      showMessage('Notice created successfully!', 'success')
      setTitle('')
      setContent('')
      setFile(null)
      const fileInput = document.getElementById('file-input') as HTMLInputElement | null
      if (fileInput) fileInput.value = ''

      await fetchNotices()
    } catch (error: any) {
      console.error(error)
      showMessage(`Error: ${error.message}`, 'error')
    } finally {
      setIsUploading(false)
    }
  }

  // DELETE (tries /api/notices/:id, falls back to /api/notices?id=)
  const deleteNotice = async (id: string) => {
    if (!confirm('Delete this notice?')) return
    try {
      let res = await fetch(`/api/notices/${id}`, { method: 'DELETE' })
      if (res.status === 404 || res.status === 405) {
        res = await fetch(`/api/notices?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      }
      if (!res.ok) throw new Error(await res.text())
      // Optimistic update
      setNotices((prev) => prev.filter((n) => n.id !== id))
      showMessage('Notice deleted', 'success')
    } catch (e: any) {
      console.error(e)
      showMessage(`Delete failed: ${e.message}`, 'error')
      // Fallback: hard refresh list
      fetchNotices()
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Notice Form */}
        <div>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Notice</h1>

          {message && (
            <div
              className={`p-4 rounded-lg mb-4 ${
                messageType === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter notice title"
                required
                disabled={isUploading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
              
              {/* Simple formatting toolbar */}
              <div className="mb-2 flex flex-wrap gap-1 p-2 border border-gray-300 rounded-t-lg bg-gray-50">
                <button 
                  type="button" 
                  onClick={() => formatText('bold')} 
                  className="p-1 px-2 rounded hover:bg-gray-200 border border-transparent hover:border-gray-300 font-bold" 
                  title="Bold"
                >
                  B
                </button>
                <button 
                  type="button" 
                  onClick={() => formatText('italic')} 
                  className="p-1 px-2 rounded hover:bg-gray-200 border border-transparent hover:border-gray-300 italic" 
                  title="Italic"
                >
                  I
                </button>
                <button 
                  type="button" 
                  onClick={() => formatText('underline')} 
                  className="p-1 px-2 rounded hover:bg-gray-200 border border-transparent hover:border-gray-300 underline" 
                  title="Underline"
                >
                  U
                </button>
                <div className="border-l border-gray-300 mx-1 h-6"></div>
                <button 
                  type="button" 
                  onClick={() => formatText('list-ul')} 
                  className="p-1 px-2 rounded hover:bg-gray-200 border border-transparent hover:border-gray-300" 
                  title="Bullet List"
                >
                  • List
                </button>
                <button 
                  type="button" 
                  onClick={() => formatText('list-ol')} 
                  className="p-1 px-2 rounded hover:bg-gray-200 border border-transparent hover:border-gray-300" 
                  title="Numbered List"
                >
                  1. List
                </button>
              </div>
              
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border border-t-0 border-gray-300 rounded-b-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                placeholder="Enter notice content (use formatting buttons above)"
                required
                disabled={isUploading}
                style={{ minHeight: '120px' }}
              />
              <p className="text-sm text-gray-500 mt-1">
                Use the formatting buttons above to style your text. The formatted result will appear in the notice list.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Attachment (Optional)</label>
              <input
                id="file-input"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                disabled={isUploading}
              />
              <div className="mt-2 text-sm text-gray-500">
                <p>Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT</p>
                <p>Maximum file size: 10MB</p>
              </div>
              {file && (
                <div className="mt-2 p-2 bg-blue-50 rounded border">
                  <p className="text-sm text-blue-700 font-medium">
                    {getFileIcon(file.type)} {file.name}
                  </p>
                  <p className="text-xs text-blue-600">
                    Size: {formatFileSize(file.size)} | Type: {file.type}
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Publishing...
                </>
              ) : (
                'Publish Notice'
              )}
            </button>
          </form>
        </div>

        {/* All Notices */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">All Notices</h2>
            <button
              onClick={fetchNotices}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              🔄 Refresh
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{notice.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">
                      📅{' '}
                      {new Date(notice.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteNotice(notice.id)}
                    className="ml-2 text-red-600 hover:text-red-800 text-sm font-medium"
                    aria-label={`Delete ${notice.title}`}
                    title="Delete"
                  >
                    ❌ Delete
                  </button>
                </div>

                <div 
                  className="text-gray-700 mb-3 prose max-w-none"
                  dangerouslySetInnerHTML={renderHtmlContent(notice.content)}
                />

                {notice.file_name && (
                  <div className="bg-gray-50 p-2 rounded border">
                    <p className="text-sm text-gray-700">
                      {getFileIcon(notice.file_type)} <span className="font-medium">{notice.file_name}</span>
                      {notice.file_size && <span className="text-gray-500 ml-2">({formatFileSize(notice.file_size)})</span>}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {notices.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">📝 No notices yet</p>
                <p className="text-sm text-gray-400 mt-1">Create your first notice above</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}