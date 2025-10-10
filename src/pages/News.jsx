import { useEffect, useState } from 'react';
import { getPosts } from '../api/wordpress';

export default function News() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Notícias & Eventos</h1>
      {posts.map((p) => (
        <article key={p.id} className="mb-6 border-b border-gray-300 pb-4">
          <h2 className="text-2xl font-semibold text-blue-600" dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
          <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }} />
        </article>
      ))}
    </div>
  );
}
