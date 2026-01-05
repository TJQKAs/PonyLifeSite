import ContentPage, { ContentPageData } from "../_components/ContentPage";
import { loadJson } from "../../lib/content";

export default async function DocsPage() {
  const data = await loadJson<ContentPageData>("content/pages/docs.json");
  return <ContentPage data={data} />;
}
