import type { MetadataRoute } from "next";
import { loadJson } from "../lib/content";
import type { Work } from "../lib/types";
import { siteUrl } from "../lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl();

  const staticRoutes = [
    "",
    "/catalog",
    "/creators",
    "/promoters",
    "/participation",
    "/transparency",
    "/docs",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const works = await loadJson<Work[]>("content/works.json");

  const workRoutes = works.map((w) => ({
    url: `${baseUrl}/catalog/${w.slug}`,
    lastModified: w.updatedAt ? new Date(w.updatedAt) : new Date(),
  }));

  return [...staticRoutes, ...workRoutes];
}
