import { cachedFetch } from "../utils/cache";
import { WP_BASE } from "./constants";

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

/**
 * Obtém as páginas-filhas de uma página (ex: seções da Home)
 * ordenadas pela ordem definida no painel (menu_order)
 */
export async function getPagesByParent(parentId) {
  const url = `${WP_BASE}/pages?parent=${parentId}&orderby=menu_order&order=asc&per_page=50&_embed`;
  return cachedFetch(`pages_parent_${parentId}`, url, {
    ttl: 10 * 60 * 1000,
  }).then((data) => {
    // Inclui featured_image_url também nas filhas (caso existam)
    data.forEach((page) => {
      page.featured_image_url =
        page._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
    });
    return data;
  });
}
