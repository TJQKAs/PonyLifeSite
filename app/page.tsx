
import HomeClient from "./_components/HomeClient";
import { loadJson } from "../lib/content";

type HomeContent = {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cards: { title: string; text: string }[];
};

export default async function HomePage() {
  const content = await loadJson<HomeContent>("content/home.json");
  return <HomeClient content={content} />;
}
