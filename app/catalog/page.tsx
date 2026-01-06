import CatalogClient from "./CatalogClient";
import { loadJson } from "../../lib/content";
import type { Work } from "../../lib/types";
 
export default async function CatalogPage() {
  const works = await loadJson<Work[]>("content/works.json");
  return <CatalogClient works={works} />;
}
