import ContentPage, { ContentPageData } from "../_components/ContentPage";
import { loadJson } from "../../lib/content";

export default async function ParticipationPage() {
  const data = await loadJson<ContentPageData>("content/pages/participation.json");
  return <ContentPage data={data} />;
}
