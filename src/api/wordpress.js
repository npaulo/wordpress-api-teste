import { cachedFetch } from "../utils/cache";

const WP_BASE =
  "https://public-api.wordpress.com/wp/v2/sites/npaulo84-fswoq.wordpress.com";

// 🔹 Páginas (ordenadas)
export async function getPages() {
  const url = `${WP_BASE}/pages?status=publish&per_page=50&orderby=menu_order&order=asc`;
  return cachedFetch("pages", url, { ttl: 10 * 60 * 1000 }); // 10 min
}

// 🔹 Posts
export async function getPosts() {
  const url = `${WP_BASE}/posts?status=publish&per_page=10&orderby=date&order=desc`;
  return cachedFetch("posts", url, { ttl: 5 * 60 * 1000 }); // 5 min
}

// 🔹 Página por slug
export async function getPageBySlug(slug) {
  const url = `${WP_BASE}/pages?slug=${slug}&status=publish`;
  const data = await cachedFetch(`page_${slug}`, url, { ttl: 10 * 60 * 1000 });
  return data[0];
}
