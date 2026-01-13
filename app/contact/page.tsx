import ContentPage, { ContentPageData } from "../_components/ContentPage";
import { loadJson } from "../../lib/content";
import ContactForm from "./ContactForm";

export default async function ContactPage() {
  const data = await loadJson<ContentPageData>("content/pages/contact.json");
  return (
    <ContentPage data={data}>
      <ContactForm />
    </ContentPage>
  );
}
