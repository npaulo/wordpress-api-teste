export default function HeroSection({ title, content, featured_image_url }) {
  const backgroundImage = featured_image_url || "/images/hero.jpg";

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center md:justify-start text-center md:text-left overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay com gradiente mais suave */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a4f7d]/70 via-[#0a4f7d]/50 to-transparent"></div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-3xl px-8 md:px-16 py-20 md:py-0 animate-hero">
        <h1
          className="text-5xl md:text-6xl font-semibold text-white drop-shadow-lg leading-tight tracking-tight mb-8"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mb-10 drop-shadow"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Botões */}
        <div className="flex flex-wrap justify-start gap-4">
          <a
            href="#/participar"
            className="inline-block bg-[#0a4f7d] text-white px-8 py-4 rounded-xl font-medium shadow-md hover:bg-[#0b74b6] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 ease-out"
          >
            Preciso de apoio
          </a>
          <a
            href="#/sobre"
            className="inline-block border border-white/60 text-white/90 px-8 py-4 rounded-xl font-medium hover:bg-white/15 backdrop-blur-sm transition-all duration-300"
          >
            Saber mais
          </a>
        </div>
      </div>
    </section>
  );
}
