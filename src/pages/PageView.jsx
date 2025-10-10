import { useLoaderData } from 'react-router-dom';
import { getPageBySlug } from '../api/wordpress';

export async function pageLoader({ params }) {
  const page = await getPageBySlug(params.slug);
  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }
  return page;
}

export default function PageView() {
  const page = useLoaderData();

  return (
    <div className="max-w-3xl mx-auto p-6 prose">
      <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
