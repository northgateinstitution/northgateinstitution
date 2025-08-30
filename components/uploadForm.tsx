'use client';
import React, { useState } from 'react';

export default function UploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return setMsg('Please choose a file');
    setLoading(true);
    setMsg('');

    try {
      const form = new FormData();
      form.append('file', file);
      form.append('title', title);
      form.append('description', description);
      form.append(
        'notice_type',
        file.type.startsWith('image/') ? 'image' : 'pdf'
      );

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Upload failed');
      }

      const json = await res.json();
      setMsg(json.ok ? '✅ Uploaded successfully' : json.error || '❌ Error');
    } catch (err: any) {
      console.error('Upload error:', err);
      setMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 p-4 bg-white rounded shadow max-w-md mx-auto"
    >
      <input
        className="w-full p-2 border rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        required
      />
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded"
        disabled={loading}
        type="submit"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      <p className="text-sm text-gray-700">{msg}</p>
    </form>
  );
}
