import { loadJson } from "@/lib/content";
import styles from "./docs.module.css";

type DocsItem = {
  title: string;
  description: string;
  format: "PDF" | "DOCX" | "HTML" | "LINK";
  slug: string;
  href: string;
  pdf?: string;
  contentKey?: string;
};

type DocsGroup = {
  heading: string;
  body: string;
  items: DocsItem[];
};

type DocsData = {
  title: string;
  subtitle: string;
  cta: Array<{ label: string; href: string; variant: "primary" | "secondary" }>;
  groups: DocsGroup[];
};

export default async function DocsPage() {
  const data = await loadJson<DocsData>("content/pages/docs.json");

  return (
    <div className={styles.wrap}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgTexture} aria-hidden="true" />

      <header className={styles.header}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>

        <div className={styles.actions}>
          {data.cta.map((c) => {
            const cls =
              c.variant === "primary"
                ? `${styles.btn} ${styles.btnPrimary}`
                : `${styles.btn} ${styles.btnSecondary}`;

            return (
              <a key={c.href} href={c.href} className={cls}>
                {c.label}
              </a>
            );
          })}
        </div>
      </header>

      {data.groups.map((g) => (
        <section key={g.heading} className={styles.group}>
          <h2 className={styles.groupHeading}>{g.heading}</h2>
          <p className={styles.groupBody}>{g.body}</p>

          <div className={styles.grid}>
            {g.items.map((it) => (
              <div key={it.slug} className={styles.cardWrap}>
                {/* Main clickable card (opens detail page) */}
                <a href={it.href} className={styles.cardLinkArea}>
                  <h3 className={styles.cardTitle}>{it.title}</h3>
                  <p className={styles.cardText}>{it.description}</p>

                  <div className={styles.cardActions}>
                    <span className={styles.cardAction}>Open →</span>
                  </div>
                </a>

                {/* Download button (only if pdf exists) */}
                {it.pdf ? (
                  <a href={it.pdf} className={styles.cardDownload} download>
                    Download PDF →
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
