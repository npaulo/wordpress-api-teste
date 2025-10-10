const WP_BASE =
  "https://public-api.wordpress.com/wp/v2/sites/npaulo84-fswoq.wordpress.com";

export async function getPages() {
  const res = await fetch(`${WP_BASE}/pages?status=publish&per_page=50`);
  if (!res.ok) throw new Error("Erro ao carregar páginas");
  return res.json();
}

export async function getPageBySlug(slug) {
  const res = await fetch(`${WP_BASE}/pages?slug=${slug}&status=publish`);
  const data = await res.json();
  return data[0];
}

export async function getPosts() {
  const res = await fetch(`${WP_BASE}/posts?status=publish&per_page=10`);
  return res.json();
}
