export default function ServicesSection({ title, content }) {
  const items = content
    .replace(/<\/?ul>/g, "")
    .split("</li>")
    .filter(Boolean);

  return (
    <section className="bg-[#f5faff] py-24 text-left">
      <div className="max-w-5xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-semibold text-[#0a4f7d] mb-10 text-center"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <ul className="grid md:grid-cols-2 gap-6 text-[#0a2a43] text-lg max-w-4xl mx-auto">
          {items.map((li, i) => (
            <li
              key={i}
              className="bg-white/80 backdrop-blur-sm border border-[#e4e8ef] rounded-xl p-6 shadow-soft hover:shadow-card transition-all"
              dangerouslySetInnerHTML={{ __html: li + "</li>" }}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
