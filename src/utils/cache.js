/**
 * Generic cache layer for REST API fetches.
 * Uses sessionStorage and supports TTL + network fallback.
 */

import { WP_BASE } from "../api/constants";

export async function cachedFetch(key, url, { ttl = 600000 } = {}) {
  // ttl padrão = 10 minutos
  const cacheKey = `cache_${key}`;
  const now = Date.now();

  // tenta ler cache
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    const data = JSON.parse(cached);
    const isExpired = now - data.timestamp > ttl;
    if (!isExpired) {
      return data.value; // cache válido
    }
  }

  try {
    // faz pedido à rede
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erro ao buscar ${url}`);
    const value = await res.json();

    // guarda cache
    sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: now, value }));

    return value;
  } catch (err) {
    console.warn(`⚠️ Erro de rede para ${key}`, err);
    // fallback: usar cache expirado
    if (cached) {
      const data = JSON.parse(cached);
      console.warn(`➡️ A usar cache expirado (${key})`);
      return data.value;
    }
    throw err; // sem cache
  }
}

export function clearCache() {
  Object.keys(sessionStorage)
    .filter((k) => k.startsWith("cache_"))
    .forEach((k) => sessionStorage.removeItem(k));
}

if (import.meta.env.MODE === "development") {
  window.clearCache = clearCache;
  console.info("💡 window.clearCache() disponível (dev mode)");
}
