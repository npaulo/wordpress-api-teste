export default function AboutSection({ title, content }) {
  return (
    <section className="bg-white py-24 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <h2
          className="text-4xl md:text-5xl font-semibold text-[#0a4f7d] mb-10"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="text-[#0a2a43]/90 leading-relaxed text-lg md:text-xl space-y-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
