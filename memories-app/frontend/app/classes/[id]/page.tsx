import Link from 'next/link';
import { apiFetch } from '@/lib/api';

type Photo = {
  id: number;
  title: string;
  story?: string;
  image_url: string;
  uploader_name: string;
};

type ClassResponse = {
  classInfo: {
    id: number;
    graduation_year: number;
    class_name: string;
  };
  photos: Photo[];
};

export default async function ClassDetailPage({ params }: { params: { id: string } }) {
  const data = await apiFetch<ClassResponse>(`/classes/${params.id}`);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">
        {data.classInfo.graduation_year}届 · {data.classInfo.class_name}
      </h2>
      <div className="columns-1 gap-4 md:columns-3">
        {data.photos.map((photo) => (
          <Link href={`/photos/${photo.id}`} key={photo.id} className="card mb-4 block break-inside-avoid">
            <img
              src={`${process.env.NEXT_PUBLIC_API_ORIGIN || 'http://localhost:4000'}${photo.image_url}`}
              alt={photo.title}
              className="mb-2 w-full rounded-lg object-cover"
            />
            <h3 className="font-semibold">{photo.title}</h3>
            <p className="line-clamp-2 text-sm text-stone-600">{photo.story || '暂无回忆描述'}</p>
            <p className="mt-1 text-xs text-stone-500">上传者：{photo.uploader_name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
