import ContentPage, { ContentPageData } from "../_components/ContentPage";
import { loadJson } from "../../lib/content";

export default async function PromotersPage() {
  const data = await loadJson<ContentPageData>("content/pages/promoters.json");
  return <ContentPage data={data} />;
}
