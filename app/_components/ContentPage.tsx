import styles from "../contentpage.module.css";

export type ContentPageData = {
  title: string;
  subtitle?: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  cta?: Array<{
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  }>;
};

export default function ContentPage({ data }: { data: ContentPageData }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.bgTexture} />
      <div className={styles.bgGlow} />

      <header className={styles.header}>
        <h1 className={styles.title}>{data.title}</h1>
        {data.subtitle ? <p className={styles.subtitle}>{data.subtitle}</p> : null}
        {data.cta?.length ? (
          <div className={styles.actions}>
            {data.cta.map((x) => (
              <a
                key={x.href}
                href={x.href}
                className={`${styles.btn} ${
                  x.variant === "primary" ? styles.btnPrimary : styles.btnSecondary
                }`}
              >
                {x.label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <section className={styles.grid}>
        {data.sections.map((s) => (
          <article key={s.heading} className={styles.card}>
            <h3 className={styles.cardTitle}>{s.heading}</h3>
            <p className={styles.cardText}>{s.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
