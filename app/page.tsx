import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      {/* Hero */}
      <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h1 style={{ fontSize: 42, lineHeight: 1.1, margin: 0 }}>
          PonyLife is an early-stage experimental platform exploring
          coordination and collective visibility for overlooked digital art.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 900, margin: 0 }}>
          We study how shared participation can redistribute attention and
          uncertainty without financial promises, guarantees, or optimization for
          “hits”.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
          <Link
            href="/catalog"
            style={{
              padding: "10px 14px",
              border: "1px solid rgba(0,0,0,0.14)",
              borderRadius: 10,
              textDecoration: "none",
              color: "inherit",
              fontWeight: 600,
            }}
          >
            Explore Works
          </Link>
          <Link
            href="/docs"
            style={{
              padding: "10px 14px",
              border: "1px solid rgba(0,0,0,0.14)",
              borderRadius: 10,
              textDecoration: "none",
              color: "inherit",
              opacity: 0.9,
            }}
          >
            Learn How It Works
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
        {[
          {
            t: "Works enter a shared ecosystem",
            d: "Creative works are associated with PonyLife to exist within a common visibility layer rather than in isolation.",
          },
          {
            t: "Participation replaces prediction",
            d: "Participants coordinate attention and effort without knowing outcomes in advance.",
          },
          {
            t: "Outcomes remain independent",
            d: "Each work succeeds or fails on its own terms. PonyLife does not pool or guarantee results.",
          },
          {
            t: "PNL enables coordination",
            d: "A token is used only as a mechanism for participation and alignment — not as an investment product.",
          },
        ].map((x) => (
          <div
            key={x.t}
            style={{
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 14,
              padding: 16,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{x.t}</div>
            <div style={{ opacity: 0.85, lineHeight: 1.6 }}>{x.d}</div>
          </div>
        ))}
      </section>

      {/* Roles */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        {[
          {
            t: "Creators",
            d: "Associate your work with a shared ecosystem and participate in collective visibility without losing independence.",
            href: "/creators",
            cta: "For Creators",
          },
          {
            t: "Promoters",
            d: "Select works from the public catalog and promote them independently. Outcomes are uncertain and self-directed.",
            href: "/promoters",
            cta: "For Promoters",
          },
          {
            t: "Collectors / Participants",
            d: "Use participation units to access works or take part in the ecosystem without expectations or guarantees.",
            href: "/participation",
            cta: "Participation",
          },
        ].map((x) => (
          <div
            key={x.t}
            style={{
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 14,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ fontWeight: 800 }}>{x.t}</div>
            <div style={{ opacity: 0.85, lineHeight: 1.6 }}>{x.d}</div>
            <Link
              href={x.href}
              style={{
                marginTop: 4,
                alignSelf: "flex-start",
                padding: "8px 12px",
                border: "1px solid rgba(0,0,0,0.14)",
                borderRadius: 10,
                textDecoration: "none",
                color: "inherit",
                fontWeight: 600,
              }}
            >
              {x.cta}
            </Link>
          </div>
        ))}
      </section>

      {/* Transparency snapshot */}
      <section
        style={{
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 14,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ fontWeight: 800 }}>Transparency Snapshot</div>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8, opacity: 0.9 }}>
          <li>Publicly verified smart contract</li>
          <li>Open liquidity pool</li>
          <li>No custody of user funds</li>
          <li>No fiduciary responsibility</li>
        </ul>
        <div style={{ opacity: 0.85 }}>
          PonyLife is <b>not a fund</b>, <b>not a financial product</b>, and provides <b>no guarantees</b>.
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/transparency" style={{ color: "inherit" }}>
            Transparency →
          </Link>
          <Link href="/docs" style={{ color: "inherit" }}>
            Read FAQ →
          </Link>
        </div>
      </section>
    </main>
  );
}
