"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./catalog.module.css";
import type { Work } from "../../lib/types";

export default function CatalogClient({ works }: { works: Work[] }) {
  const [q, setQ] = useState("");
  const [medium, setMedium] = useState("All");
  const [status, setStatus] = useState("All");
  const [language, setLanguage] = useState("All");

  const mediums = useMemo(() => ["All", ...unique(works.map((w) => w.medium))], [works]);
  const statuses = useMemo(() => ["All", ...unique(works.map((w) => w.status))], [works]);
  const languages = useMemo(
    () => ["All", ...unique(works.map((w) => w.language || "N/A"))],
    [works]
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return works.filter((w) => {
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
  }, [works, q, medium, status, language]);

  return (
    <div className={styles.wrap}>
      <div className={styles.bgTexture} />
      <div className={styles.bgGlow} />

      <header className={styles.header}>
        <h1 className={styles.title}>Catalog</h1>
        <p className={styles.subtitle}>
          A public list of works voluntarily associated with the PonyLife ecosystem.
          Inclusion does not imply endorsement, valuation, or expected outcomes.
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
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select className={styles.input} value={status} onChange={(e) => setStatus(e.target.value)}>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select className={styles.input} value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          No works match your filters. Try a different search term.
        </div>
      ) : (
        <section className={styles.grid}>
          {filtered.map((w) => (
            <Link key={w.slug} href={`/catalog/${w.slug}`} className={styles.card}>
              <div className={styles.cover}>
                {/* простая картинка из JSON */}
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

              <div className={styles.metaRow}>
                <span>{w.medium}</span>
                <span>{w.language || "N/A"}</span>
              </div>

              <div className={styles.tags}>
                {w.tags.slice(0, 4).map((t) => (
                  <span key={t} className={styles.tag}>#{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}
