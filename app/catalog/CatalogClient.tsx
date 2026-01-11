"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import styles from "./catalog.module.css";
import type { Work } from "../../lib/types";

export default function CatalogClient({ works }: { works: Work[] }) {
  const [q, setQ] = useState("");
  const [medium, setMedium] = useState("All");
  const [status, setStatus] = useState("All");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState("New");

  const scrollerRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  const mediums = useMemo(() => ["All", ...unique(works.map((w) => w.medium))], [works]);
  const statuses = useMemo(() => ["All", ...unique(works.map((w) => w.status))], [works]);
  const languages = useMemo(
    () => ["All", ...unique(works.map((w) => w.language || "N/A"))],
    [works]
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    const base = works.filter((w) => {
      const matchesQ =
        !term ||
        w.title.toLowerCase().includes(term) ||
        w.creator.toLowerCase().includes(term) ||
        w.summary.toLowerCase().includes(term) ||
        w.tags.join(" ").toLowerCase().includes(term);

      const matchesMedium = medium === "All" || w.medium === medium;
      const matchesStatus = status === "All" || w.status === status;

      const lang = w.language || "N/A";
      const matchesLang = language === "All" || lang === language;

      return matchesQ && matchesMedium && matchesStatus && matchesLang;
    });

    const byDateDesc = (a?: string, b?: string) => {
      const aa = a ? Date.parse(a) : 0;
      const bb = b ? Date.parse(b) : 0;
      return bb - aa;
    };

    const sorted = [...base].sort((a, b) => {
      if (sort === "Featured") {
        const fa = a.featured ? 1 : 0;
        const fb = b.featured ? 1 : 0;
        if (fb !== fa) return fb - fa;
        return a.title.localeCompare(b.title);
      }

      if (sort === "RecentlyActive") {
        const d = byDateDesc(a.updatedAt, b.updatedAt);
        if (d !== 0) return d;
        return a.title.localeCompare(b.title);
      }

      if (sort === "AZ") {
        return a.title.localeCompare(b.title);
      }

      // default: New first
      const aNew = a.status === "New" ? 1 : 0;
      const bNew = b.status === "New" ? 1 : 0;
      if (bNew !== aNew) return bNew - aNew;

      const d = byDateDesc(a.updatedAt, b.updatedAt);
      if (d !== 0) return d;

      return a.title.localeCompare(b.title);
    });

    return sorted;
  }, [works, q, medium, status, language, sort]);

  return (
    <div className={styles.wrap}>
      <div className={styles.bgTexture} />
      <div className={styles.bgGlow} />

      <header className={styles.header}>
        <h1 className={styles.title}>Catalog</h1>
        <p className={styles.subtitle}>
          A public list of works voluntarily associated with the PonyLife ecosystem. Inclusion does
          not imply endorsement, valuation, or expected outcomes.
        </p>

        <div className={styles.controls}>
          <input
            className={styles.input}
            placeholder="Search title, creator, tags…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <select className={styles.input} value={medium} onChange={(e) => setMedium(e.target.value)}>
            {mediums.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select className={styles.input} value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className={styles.input}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>

          <select className={styles.input} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="New">Sort: New</option>
            <option value="RecentlyActive">Sort: Recently Active</option>
            <option value="Featured">Sort: Featured</option>
            <option value="AZ">Sort: A–Z</option>
          </select>
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className={styles.empty}>No works match your filters. Try a different search term.</div>
      ) : (
        <section className={styles.carouselWrap}>
          <div className={styles.carouselNav}>
            <button type="button" onClick={() => scroll(-1)} className={styles.carouselBtn}>
              ←
            </button>
            <button type="button" onClick={() => scroll(1)} className={styles.carouselBtn}>
              →
            </button>
          </div>

          <div ref={scrollerRef} className={styles.carousel}>
            {filtered.map((w) => (
              <Link
                key={w.slug}
                href={`/catalog/${w.slug}`}
                className={`${styles.card} ${styles.carouselCard}`}
              >
                <div className={styles.cover}>
                  {w.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={w.coverImage} alt="" className={styles.coverInner} />
                  ) : null}
                </div>

                <div className={styles.metaRow}>
                  <span>{w.creator}</span>
                  <span>{w.status}</span>
                </div>

                <h3 className={styles.h3}>{w.title}</h3>

                <p className={styles.p}>{w.summary}</p>

                {typeof w.price === "number" ? (
                  <div className={styles.metaRow}>
                    <span>Price</span>
                    <span>{w.price} PNL</span>
                  </div>
                ) : null}

                <div className={styles.metaRow}>
                  <span>{w.medium}</span>
                  <span>{w.language || "N/A"}</span>
                </div>

                <div className={styles.tags}>
                  {w.tags.slice(0, 4).map((t) => (
                    <span key={t} className={styles.tag}>
                      #{t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}
