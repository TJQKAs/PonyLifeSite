"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../home.module.css";

type HomeContent = {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cards: { title: string; text: string }[];
};

export default function HomeClient({ content }: { content: HomeContent }) {
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

      <section className={styles.grid}>
        {content.cards.map((c) => (
          <div key={c.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{c.title}</h3>
            <p className={styles.cardText}>{c.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
