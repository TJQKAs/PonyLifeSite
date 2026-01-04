"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./home.module.css";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // лёгкая загрузочная анимация (не бесконечная)
    const t = setTimeout(() => setLoading(false), 700);
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
        <h1 className={styles.hTitle}>
          PonyLife is an early-stage experimental platform exploring coordination
          and collective visibility for overlooked digital art.
        </h1>

        <p className={styles.hSub}>
          We study how shared participation can redistribute attention and
          uncertainty without financial promises, guarantees, or optimization for
          “hits”.
        </p>

        <div className={styles.actions}>
          <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/catalog">
            Explore Works
          </Link>
          <Link className={`${styles.btn} ${styles.btnSecondary}`} href="/docs">
            Learn How It Works
          </Link>
        </div>
      </section>

      <section className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Works enter a shared ecosystem</h3>
          <p className={styles.cardText}>
            Creative works are associated with PonyLife to exist within a common
            visibility layer rather than in isolation.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Participation replaces prediction</h3>
          <p className={styles.cardText}>
            Participants coordinate attention and effort without knowing outcomes
            in advance.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Outcomes remain independent</h3>
          <p className={styles.cardText}>
            Each work succeeds or fails on its own terms. PonyLife does not pool
            or guarantee results.
          </p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>PNL enables coordination</h3>
          <p className={styles.cardText}>
            A token is used only as a mechanism for participation and alignment —
            not as an investment product.
          </p>
        </div>
      </section>
    </div>
  );
}
