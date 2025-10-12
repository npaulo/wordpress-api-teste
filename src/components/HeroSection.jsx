export default function HeroSection({ title, content }) {
  return (
    <section className="relative bg-gradient-to-b from-[#e8f3ff] to-white py-24 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h1
          className="text-4xl md:text-5xl font-bold text-[#0a4f7d] mb-6"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="text-lg text-[#0a2a43] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-8 flex justify-center gap-4">
          <a href="#/participar" className="btn btn-primary">
            Preciso de apoio
          </a>
          <a href="#/sobre" className="btn btn-outline">
            Saber mais
          </a>
        </div>
      </div>
    </section>
  );
}
