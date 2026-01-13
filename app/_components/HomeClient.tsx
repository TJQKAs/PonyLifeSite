"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../home.module.css";
import type { Work } from "../../lib/types";

type HomeContent = {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cards: { title: string; text: string }[];
  featured: {
    title: string;
    subtitle: string;
    ctaLabel: string;
  };
};

export default function HomeClient({
  content,
  featuredWorks,
  catalogCount,
}: {
  content: HomeContent;
  featuredWorks: Work[];
  catalogCount: number;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.bgWrap}>
      <div className={styles.bgTexture} />
      <div className={styles.bgGlow} />

      {loading && (
        <div className={styles.loader} aria-label="Loading">
          <div className={styles.loaderInner}>
            <Image
              src="/brand/logo.png"
              alt="PonyLife"
              width={120}
              height={120}
              className={styles.logoPulse}
              priority
            />
            <div className={styles.loadingText}>PonyLife</div>
          </div>
        </div>
      )}

      <section className={styles.hero}>
        <h1 className={styles.hTitle}>{content.heroTitle}</h1>
        <p className={styles.hSub}>{content.heroSubtitle}</p>

        <div className={styles.actions}>
          <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/catalog">
            {content.ctaPrimary}
          </Link>
          <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/docs">
            {content.ctaSecondary}
          </Link>
        </div>
      </section>

      {/* How it works cards */}
      <section className={styles.grid}>
        {content.cards.map((c) => (
          <div key={c.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{c.title}</h3>
            <p className={styles.cardText}>{c.text}</p>
          </div>
        ))}
      </section>

      {/* Featured works */}
      <section style={{ marginTop: 26 }}>
        <div className={styles.featuredHeader}>
          <h2 className={styles.featuredTitle}>{content.featured.title}</h2>
          <p className={styles.featuredSub}>{content.featured.subtitle}</p>
        </div>

        <div className={styles.featuredGrid}>
          {featuredWorks.map((w) => (
            <Link key={w.slug} href={`/catalog/${w.slug}`} className={styles.workCard}>
              <div className={styles.workCover}>
                {w.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={w.coverImage} alt="" className={styles.workCoverInner} />
                ) : null}
              </div>

              <div className={styles.workMeta}>
                <span>{w.creator}</span>
                <span>{w.status}</span>
              </div>

              <h3 className={styles.workTitle}>{w.title}</h3>
              <p className={styles.workSummary}>{w.summary}</p>

              <div className={styles.workTags}>
                {w.tags.slice(0, 3).map((t) => (
                  <span key={t} className={styles.workTag}>#{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 14 }}>
          <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/catalog">
              {content.featured.ctaLabel}: {catalogCount} items
          </Link>
        </div>
      </section>
    </div>
  );
}
