import React from 'react';


export default function NoticeCard({ notice }: { notice: any }) {
return (
<div className="border rounded p-4 bg-white">
<h3 className="font-semibold">{notice.title}</h3>
<p className="text-sm">{notice.description}</p>
<p className="text-xs text-gray-500">{new Date(notice.created_at).toLocaleString()}</p>
<div className="mt-2">
{notice.file_mime?.startsWith('image') ? (
// image preview
<img src={notice.file_url} alt={notice.title} className="max-h-40 object-contain" />
) : (
<a href={notice.file_url} target="_blank" rel="noreferrer" className="text-indigo-600 underline">Download PDF / Open</a>
)}
</div>
</div>
);
}