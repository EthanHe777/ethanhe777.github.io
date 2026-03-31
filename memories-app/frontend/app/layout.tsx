import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="sticky top-0 z-20 border-b border-amber-200 bg-amber-100/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center gap-4 p-4 text-sm font-medium">
            <Link href="/">时光档案馆</Link>
            <Link href="/classes">班级列表</Link>
            <Link href="/upload">上传照片</Link>
          </nav>
        </header>
        <main className="mx-auto min-h-screen max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
