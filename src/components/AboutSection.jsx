export default function AboutSection({ title, content }) {
  return (
    <section className="bg-white py-20 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-semibold text-[#0a4f7d] mb-6"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="text-[#0a2a43] leading-relaxed text-lg prose prose-blue mx-auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
