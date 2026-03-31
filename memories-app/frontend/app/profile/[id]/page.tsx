export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">同学个人页 #{params.id}</h1>
      <p className="card">可展示头像、毕业年份、班级、上传照片列表（MVP 可通过后端接口继续扩展）。</p>
    </section>
  );
}
