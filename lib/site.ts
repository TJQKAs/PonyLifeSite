export function siteUrl() {
  // NEXT_PUBLIC_SITE_URL доступен и на сервере, и на клиенте
  const v = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return v && v.startsWith("http") ? v.replace(/\/$/, "") : "https://ponylife.art";
}

export function absoluteUrl(path: string) {
  const base = siteUrl();
  if (!path) return base;
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
