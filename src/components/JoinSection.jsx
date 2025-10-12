export default function JoinSection({ title, content }) {
  return (
    <section className="bg-gradient-to-b from-[#0a4f7d] to-[#095a9b] text-white py-28 md:py-32 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className="text-4xl md:text-5xl font-semibold mb-10"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="text-xl opacity-90 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a
            href="#/contactos"
            className="bg-white text-[#0a4f7d] px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Entrar em contacto
          </a>
          <a
            href="#/participar"
            className="border border-white px-8 py-4 rounded-xl hover:bg-white/10 transition"
          >
            Participar num grupo
          </a>
        </div>
      </div>
    </section>
  );
}
