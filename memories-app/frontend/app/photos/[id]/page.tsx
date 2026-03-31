import { apiFetch } from '@/lib/api';

type PhotoDetail = {
  photo: {
    id: number;
    title: string;
    story?: string;
    image_url: string;
    uploader_name: string;
    created_at: string;
  };
  comments: Array<{ id: number; name: string; content: string; created_at: string }>;
};

export default async function PhotoDetailPage({ params }: { params: { id: string } }) {
  const data = await apiFetch<PhotoDetail>(`/photos/${params.id}`);

  return (
    <article className="space-y-4">
      <h1 className="text-2xl font-bold">{data.photo.title}</h1>
      <img
        src={`${process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:4000'}${data.photo.image_url}`}
        alt={data.photo.title}
        className="max-h-[70vh] w-full rounded-2xl object-contain"
      />
      <p className="card">{data.photo.story || '暂无故事描述。'}</p>
      <section className="card">
        <h2 className="mb-3 text-lg font-semibold">同学留言</h2>
        <ul className="space-y-2">
          {data.comments.map((comment) => (
            <li key={comment.id} className="rounded-lg bg-amber-50 p-2 text-sm">
              <span className="font-medium">{comment.name}：</span>
              {comment.content}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
