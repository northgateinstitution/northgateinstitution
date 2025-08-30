'use client';

import { useState } from 'react';
import { QuestionType, QuestionFormat } from '@/types/question.types';

export default function QuestionForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>('text');
  const [questionFormat, setQuestionFormat] = useState<QuestionFormat>('text');
  const [file, setFile] = useState<File | null>(null);
  const [subjectId, setSubjectId] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    let fileUrl = '';

    try {
      // Upload to Google Drive if file is present
      if (file && questionFormat !== 'text') {
        const formData = new FormData();
        formData.append('file', file);
        formData.append(
          'folderId',
          process.env.NEXT_PUBLIC_GOOGLE_DRIVE_QUESTIONS_FOLDER || ''
        );

        const uploadRes = await fetch('/api/upload-to-drive', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) throw new Error('Failed to upload to Google Drive');

        const driveFile = await uploadRes.json();
        fileUrl = driveFile.webViewLink || '';
      }

      // Save metadata to Supabase (via API route)
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          type: questionType,
          format: questionFormat,
          file_url: fileUrl,
          subject_id: subjectId,
          difficulty,
        }),
      });

      if (!response.ok) throw new Error('Failed to save question');

      alert('Question saved successfully! ✅');
      
      // Reset form
      setTitle('');
      setContent('');
      setFile(null);
      setSubjectId('');
      setDifficulty('easy');
      setQuestionType('text');
      setQuestionFormat('text');

    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-1">Content / Description</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Question type */}
      <div>
        <label className="block text-sm font-medium mb-1">Question Type</label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value as QuestionType)}
          className="w-full p-2 border rounded"
        >
          <option value="text">Text Question</option>
          <option value="mcq">Multiple Choice</option>
          <option value="short_answer">Short Answer</option>
          <option value="long_answer">Long Answer</option>
        </select>
      </div>

      {/* Format */}
      <div>
        <label className="block text-sm font-medium mb-1">Format</label>
        <select
          value={questionFormat}
          onChange={(e) => setQuestionFormat(e.target.value as QuestionFormat)}
          className="w-full p-2 border rounded"
        >
          <option value="text">Text Format</option>
          <option value="pdf">PDF Upload</option>
          <option value="image">Image Upload</option>
        </select>
      </div>

      {/* File upload */}
      {questionFormat !== 'text' && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload {questionFormat.toUpperCase()}
          </label>
          <input
            type="file"
            accept={questionFormat === 'pdf' ? '.pdf' : 'image/*'}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      )}

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium mb-1">Subject ID</label>
        <input
          type="text"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-sm font-medium mb-1">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
          className="w-full p-2 border rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isUploading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {isUploading ? 'Uploading...' : 'Create Question'}
      </button>
    </form>
  );
}
