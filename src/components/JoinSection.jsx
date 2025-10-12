export default function JoinSection({ title, content }) {
  return (
    <section className="bg-[#0a4f7d] text-white py-24 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-semibold mb-6"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="text-lg opacity-90 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#/contactos"
            className="btn bg-white text-[#0a4f7d] hover:bg-gray-100"
          >
            Entrar em contacto
          </a>
          <a
            href="#/participar"
            className="btn border border-white hover:bg-white/10"
          >
            Participar num grupo
          </a>
        </div>
      </div>
    </section>
  );
}
