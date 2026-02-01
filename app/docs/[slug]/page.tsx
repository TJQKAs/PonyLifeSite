import Link from "next/link";
import { notFound } from "next/navigation";
import { loadJson } from "@/lib/content";
import hubStyles from "../docs.module.css";
import styles from "./doc.module.css";

type DocsItem = {
  title: string;
  description: string;
  format: "PDF" | "DOCX" | "HTML" | "LINK";
  slug: string;
  href: string;
  pdf?: string;
  contentKey?: string;
};

type DocsData = {
  title: string;
  subtitle: string;
  groups: Array<{ heading: string; body: string; items: DocsItem[] }>;
};

type DocContent = {
  title: string;
  subtitle?: string;
  updated?: string;
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
};

function findItemBySlug(data: DocsData, slug: string): DocsItem | null {
  for (const g of data.groups) {
    const item = g.items.find((i) => i.slug === slug);
    if (item) return item;
  }
  return null;
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const hub = await loadJson<DocsData>("content/pages/docs.json");
  const item = findItemBySlug(hub, slug);

  if (!item || !item.contentKey) return notFound();

  const content = await loadJson<DocContent>(item.contentKey);

  return (
    <div className={hubStyles.wrap}>
      <div className={hubStyles.bgGlow} aria-hidden="true" />
      <div className={hubStyles.bgTexture} aria-hidden="true" />

      <header className={hubStyles.header}>
        <div className={styles.breadcrumbs}>
          <Link href="/docs" className={styles.breadcrumbLink}>
            Docs
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{item.title}</span>
        </div>

        <h1 className={hubStyles.title}>{content.title}</h1>
        {content.subtitle ? <p className={hubStyles.subtitle}>{content.subtitle}</p> : null}

        <div className={styles.metaRow}>
          {content.updated ? <div className={styles.meta}>Updated: {content.updated}</div> : null}
          <div className={styles.meta}>Format: {item.format}</div>
        </div>

        {/* ✅ Buttons like “previous style” */}
        <div className={hubStyles.actions}>
          {item.pdf ? (
            <a href={item.pdf} className={`${hubStyles.btn} ${hubStyles.btnPrimary}`} download>
              Download PDF →
            </a>
          ) : null}

          <Link href="/docs" className={`${hubStyles.btn} ${hubStyles.btnSecondary}`}>
            Back to Docs
          </Link>
        </div>
      </header>

      <article className={styles.article}>
        {content.sections.map((s) => (
          <section key={s.heading} className={styles.section}>
            <h2 className={styles.h2}>{s.heading}</h2>

            {s.paragraphs?.map((p, idx) => (
              <p key={idx} className={styles.p}>
                {p}
              </p>
            ))}

            {s.bullets?.length ? (
              <ul className={styles.ul}>
                {s.bullets.map((b) => (
                  <li key={b} className={styles.li}>
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>
    </div>
  );
}
