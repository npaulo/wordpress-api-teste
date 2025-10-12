export default function ServicesSection({ title, content }) {
  return (
    <section className="bg-[#f5faff] py-20 text-left">
      <div className="max-w-5xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-semibold text-[#0a4f7d] mb-8"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="grid md:grid-cols-2 gap-8 text-[#0a2a43] leading-relaxed text-lg prose prose-blue"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
