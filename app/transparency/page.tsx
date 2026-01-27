import { loadJson } from "../../lib/content";
import styles from "./transparency.module.css";

type TransparencyData = {
  title: string;
  subtitle: string;
  principles: string[];
  infrastructure: {
    network: string;
    tokenSymbol: string;
    pair: string;
    supply: string;
    contractVerified: boolean;
    notes: string;
  };
  links: Array<{ label: string; href: string; description: string }>;
  disclaimer: string;
  changelog: Array<{ date: string; text: string }>;
};

export default async function TransparencyPage() {
  const data = await loadJson<TransparencyData>("content/pages/transparency.json");

  return (
    <div className={styles.wrap}>
      <div className={styles.bgTexture} />
      <div className={styles.bgGlow} />

      <header className={styles.header}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
      </header>

      <section className={styles.grid}>
        {/* Principles */}
        <div className={styles.card}>
          <h3 className={styles.h3}>Principles</h3>
          <ul className={styles.list}>
            {data.principles.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {/* Infrastructure */}
        <div className={styles.card}>
          <h3 className={styles.h3}>Infrastructure</h3>
          <div className={styles.kv}>
            <div className={styles.key}>Network</div>
            <div className={styles.value}>{data.infrastructure.network}</div>

            <div className={styles.key}>Token</div>
            <div className={styles.value}>{data.infrastructure.tokenSymbol}</div>

            <div className={styles.key}>Pair</div>
            <div className={styles.value}>{data.infrastructure.pair}</div>

            <div className={styles.key}>Supply</div>
            <div className={styles.value}>{data.infrastructure.supply}</div>

            <div className={styles.key}>Contract</div>
            <div className={styles.value}>
           {data.infrastructure.contractVerified ? "Verified ✅" : "Not verified ⚠️"}
            </div>
          </div>

          <p className={styles.p} style={{ marginTop: 10 }}>
            {data.infrastructure.notes}
          </p>
        </div>

        {/* Links */}
        <div className={`${styles.card} ${styles.fullWidth}`}>
          <h3 className={styles.h3}>Public references</h3>
          <p className={styles.p} style={{ marginTop: 6, marginBottom: 12 }}>
  These references allow anyone to independently verify the public infrastructure.
</p>
          <div className={styles.links}>
            {data.links.map((l) => {
              const external = l.href.startsWith("http");
              return (
                <div key={l.href} className={styles.linkCard}>
                  <div className={styles.linkTop}>
                    <a
                      className={styles.linkLabel}
                      href={l.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                    >
                      {l.label}
                    </a>
                    <span className={styles.badge}>
                      {external ? "External" : "Internal"}
                    </span>
                  </div>
                  <div className={styles.linkDesc}>{l.description}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`${styles.card} ${styles.fullWidth}`}>
          <h3 className={styles.h3}>Disclaimer</h3>
          <p className={styles.p}>{data.disclaimer}</p>
        </div>

        {/* Changelog */}
        <div className={`${styles.card} ${styles.fullWidth}`}>
          <h3 className={styles.h3}>Change log</h3>
          <div className={styles.changelog}>
            {data.changelog.map((c, idx) => (
              <div key={`${c.date}-${idx}`} className={styles.changeRow}>
                <div className={styles.date}>{c.date}</div>
                <div className={styles.text}>{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
