export default function DefaultSection({ title, content }) {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2
          className="text-2xl md:text-3xl font-semibold text-[#0a4f7d] mb-4"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="text-[#0a2a43] prose prose-blue"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
