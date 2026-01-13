import HomeClient from "./_components/HomeClient";
import { loadJson } from "../lib/content";
import type { Work } from "../lib/types";

type HomeContent = {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cards: { title: string; text: string }[];
  featured: { title: string; subtitle: string; ctaLabel: string };
};

export default async function HomePage() {
  const content = await loadJson<HomeContent>("content/home.json");
  const works = await loadJson<Work[]>("content/works.json");

  const featuredWorks = works.slice(0, 3);

  return <HomeClient content={content} featuredWorks={featuredWorks} catalogCount={works.length}/>;
}
