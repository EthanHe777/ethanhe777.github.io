import Link from 'next/link';
import { apiFetch } from '@/lib/api';

type ClassItem = {
  id: number;
  graduation_year: number;
  class_name: string;
  student_count: number;
  photo_count: number;
};

export default async function ClassesPage() {
  const classes = await apiFetch<ClassItem[]>('/classes');

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">班级列表</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {classes.map((item) => (
          <Link className="card block" href={`/classes/${item.id}`} key={item.id}>
            <h3 className="text-lg font-semibold">
              {item.graduation_year}届 · {item.class_name}
            </h3>
            <p className="text-sm text-stone-600">{item.student_count} 位同学 · {item.photo_count} 张照片</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
