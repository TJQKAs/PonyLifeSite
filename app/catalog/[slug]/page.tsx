export const dynamic = "force-dynamic";
import { absoluteUrl } from "../../../lib/site";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadJson } from "../../../lib/content";
import type { Work } from "../../../lib/types";
import styles from "./work.module.css";

type PageProps = { params: Promise<{ slug: string }> };

// function absoluteUrl(path: string) {
//   const base = "https://ponylife.art";
//   if (!path) return base;
//   if (path.startsWith("http")) return path;
//   return `${base}${path.startsWith("/") ? path : `/${path}`}`;
// }

async function getWorkBySlug(rawSlug: string) {
  const works = await loadJson<Work[]>("content/works.json");
  const slug = decodeURIComponent(rawSlug).trim().toLowerCase();

  const work = works.find((w) => String(w.slug || "").trim().toLowerCase() === slug);

  return { work, slug, works };
}

export async function generateMetadata(
  props: { params: Promise<{ slug?: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const rawSlug = params?.slug;

  // generateMetadata может вызываться без slug (prefetch / build)
  if (!rawSlug) {
    return {
      title: "PonyLife",
      description: "Experimental coordination layer for overlooked digital art.",
    };
  }

  const { work } = await getWorkBySlug(rawSlug);

  if (!work) {
    return {
      title: "Work not found — PonyLife",
      description: "The requested work does not exist in the public catalog.",
    };
  }

  const title = `${work.title} — PonyLife`;
  const description =
    work.summary ||
    "A work associated with the PonyLife ecosystem. Participation is voluntary. No guarantees.";

  const ogImage = work.coverImage
    ? absoluteUrl(work.coverImage)
    : absoluteUrl("/brand/logo.png");

  const url = absoluteUrl(`/catalog/${work.slug}`);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "PonyLife",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: work.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const p = await params;
  const { work, slug, works } = await getWorkBySlug(p.slug);

  if (!work) {
    // Временно можно оставить — чтобы если снова будет 404, ты сразу увидел причину
    return notFound();
  }

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
           <span className={styles.pill}>Price: {work.price || "N/A"} PNL</span>
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
              <p key={idx} className={styles.p}>
                {p}
              </p>
            ))}
          </div>

          <div className={styles.note}>
            This work exists independently of PonyLife. Participation is voluntary. No guarantees.
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
            PonyLife does not provide financial promises, does not pool results, and does not optimize for “hits”.
          </div>
        </aside>
      </div>
    </div>
  );
}
