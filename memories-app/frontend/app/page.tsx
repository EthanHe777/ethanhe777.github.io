import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="space-y-6 py-10">
      <h1 className="text-4xl font-bold text-nostalgia-700">定南中学时光档案馆</h1>
      <p className="max-w-2xl text-lg text-stone-700">
        这是一个以“届别 + 班级”为核心的回忆平台。上传旧照片、讲述故事、与同学重逢。
      </p>
      <div className="flex gap-3">
        <Link className="rounded-full bg-nostalgia-500 px-5 py-2 text-white" href="/classes">
          浏览班级
        </Link>
        <Link className="rounded-full border border-nostalgia-500 px-5 py-2 text-nostalgia-700" href="/upload">
          上传回忆
        </Link>
      </div>
    </section>
  );
}
