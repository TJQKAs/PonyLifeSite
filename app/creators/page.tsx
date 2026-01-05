import ContentPage, { ContentPageData } from "../_components/ContentPage";
import { loadJson } from "../../lib/content";

export default async function CreatorsPage() {
  const data = await loadJson<ContentPageData>("content/pages/creators.json");
  return <ContentPage data={data} />;
}
