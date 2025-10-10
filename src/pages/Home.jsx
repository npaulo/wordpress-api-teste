import { useEffect, useState } from "react";
import { getPages } from "../api/wordpress.js";
import { BASE_URL } from "../constants.js";

export default function Home() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    getPages().then(setPages);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600">Pais Coragem</h1>
        <p className="mt-2 text-lg text-gray-700">
          A apoiar famílias na jornada do luto e da perda gestacional.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Explorar páginas
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {pages.map((p) => (
            <li key={p.id}>
              <a
                className="text-blue-600 hover:underline"
                href={`${BASE_URL}/${p.slug}`}
              >
                {p.title.rendered}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
