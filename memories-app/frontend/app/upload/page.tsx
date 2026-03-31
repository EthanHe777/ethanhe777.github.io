'use client';

import { useState } from 'react';

const API_ORIGIN = process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:4000';

export default function UploadPage() {
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_ORIGIN}/api/photos`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token || ''}` },
      body: formData
    });

    if (!res.ok) {
      setMessage('上传失败，请检查登录状态与表单内容。');
      return;
    }

    setMessage('上传成功，回忆已进入班级相册。');
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">上传照片</h1>
      <form
        className="card grid gap-3"
        action={async (fd) => {
          await handleSubmit(fd);
        }}
      >
        <input name="classId" type="number" placeholder="班级ID" required className="rounded border p-2" />
        <input name="title" placeholder="照片标题" required className="rounded border p-2" />
        <input name="takenAt" type="date" className="rounded border p-2" />
        <textarea name="story" placeholder="写下故事" className="rounded border p-2" />
        <select name="category" className="rounded border p-2" defaultValue="old-photo">
          <option value="old-photo">老照片</option>
          <option value="class-group">班级合照</option>
          <option value="activity">活动照片</option>
          <option value="graduation">毕业照</option>
        </select>
        <input name="image" type="file" accept="image/*" required className="rounded border p-2" />
        <button className="rounded bg-nostalgia-500 px-4 py-2 text-white" type="submit">
          提交
        </button>
      </form>
      {message && <p className="text-sm text-nostalgia-700">{message}</p>}
    </section>
  );
}
