import { notFound } from "next/navigation";
import { loadJson } from "../../../lib/content";
import type { Work } from "../../../lib/types";
import styles from "./work.module.css";

type PageProps = { params: { slug: string } };

export default async function WorkDetailPage({ params }: PageProps) {
  const works = await loadJson<Work[]>("content/works.json");
  const work = works.find((w) => w.slug === params.slug);

  if (!work) return notFound();

  return (
    <div className={styles.wrap}>
      <div className={styles.bgTexture} />
      <div className={styles.bgGlow} />

      <header className={styles.header}>
        <h1 className={styles.title}>{work.title}</h1>
        <div className={styles.meta}>
          <span className={styles.pill}>Creator: {work.creator}</span>
          <span className={styles.pill}>Status: {work.status}</span>
          <span className={styles.pill}>Medium: {work.medium}</span>
          <span className={styles.pill}>Language: {work.language || "N/A"}</span>
        </div>
      </header>

      <div className={styles.heroCard}>
        <div className={styles.cover}>
          {work.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={work.coverImage} alt="" className={styles.coverInner} />
          ) : null}
        </div>
      </div>

      <div className={styles.body}>
        <section className={styles.card}>
          <h3 className={styles.h3}>About this work</h3>
          <div className={styles.list}>
            {(work.description || []).map((p, idx) => (
              <p key={idx} className={styles.p}>{p}</p>
            ))}
          </div>

          <div className={styles.note}>
            This work exists independently of PonyLife. Participation is voluntary.
            No guarantees. Outcomes remain uncertain.
          </div>
        </section>

        <aside className={styles.card}>
          <h3 className={styles.h3}>Participation pathways</h3>
          <div className={styles.list}>
            {(work.participation || []).map((x) => (
              <div key={x.title}>
                <div style={{ fontWeight: 800, marginBottom: 4 }}>{x.title}</div>
                <div className={styles.p}>{x.text}</div>
              </div>
            ))}
          </div>

          <div className={styles.note}>
            PonyLife does not provide financial promises, does not pool results,
            and does not optimize for “hits”.
          </div>
        </aside>
      </div>
    </div>
  );
}
