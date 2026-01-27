import { loadJson } from "../../lib/content";
import Link from "next/link";

type DocsData = {
  title: string;
  subtitle: string;
  cta: Array<{ label: string; href: string; variant: "primary" | "secondary" }>;
  groups: Array<{
    heading: string;
    body: string;
    items: Array<{
      title: string;
      description: string;
      format: "PDF" | "DOCX" | "HTML" | "LINK";
      href: string;
    }>;
  }>;
};

export default async function DocsPage() {
  const data = await loadJson<DocsData>("content/pages/docs.json");

  return (
    <div style={{ padding: "28px 0" }}>
      <header style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: 42, letterSpacing: "-0.02em" }}>{data.title}</h1>
        <p style={{ margin: 0, maxWidth: 920, opacity: 0.8, lineHeight: 1.65 }}>{data.subtitle}</p>

        <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
          {data.cta.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.14)",
                background: c.variant === "primary" ? "rgba(255,255,255,0.10)" : "transparent",
                color: "white"
              }}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
        {data.groups.map((g) => (
          <section
            key={g.heading}
            style={{
              borderRadius: 16,
              padding: 16,
              background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
              border: "1px solid rgba(255,255,255,0.10)"
            }}
          >
            <h3 style={{ margin: 0, fontSize: 16, letterSpacing: "-0.01em" }}>{g.heading}</h3>
            <p style={{ margin: "8px 0 12px", opacity: 0.8, lineHeight: 1.65 }}>{g.body}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              {g.items.map((it) => {
                const external = it.href.startsWith("http");
                const isDownload = it.format === "PDF" || it.format === "DOCX";
                const Card = (
                  <div
                    style={{
                      borderRadius: 14,
                      padding: 12,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                      <div style={{ fontWeight: 800 }}>{it.title}</div>
                      <span style={{ fontSize: 12, opacity: 0.8 }}>{it.format}</span>
                    </div>
                    <div style={{ marginTop: 6, fontSize: 13, opacity: 0.78, lineHeight: 1.55 }}>
                      {it.description}
                    </div>
                    <div style={{ marginTop: 10, fontSize: 13, opacity: 0.9 }}>
                      {isDownload ? "Download →" : "Open →"}
                    </div>
                  </div>
                );

                if (external || isDownload) {
                  return (
                    <a
                      key={it.href}
                      href={it.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {Card}
                    </a>
                  );
                }

                return (
                  <Link key={it.href} href={it.href} style={{ textDecoration: "none", color: "inherit" }}>
                    {Card}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
