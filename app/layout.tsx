import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PonyLife",
  description:
    "Experimental coordination layer for overlooked digital art. Website first, token second.",
};

const nav = [
  { href: "/catalog", label: "Catalog" },
  { href: "/creators", label: "Creators" },
  { href: "/promoters", label: "Promoters" },
  { href: "/participation", label: "Participation" },
  { href: "/transparency", label: "Transparency" },
  { href: "/docs", label: "Docs" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          <div
            style={{
              maxWidth: 1080,
              margin: "0 auto",
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <Link
              href="/"
              style={{
                fontWeight: 700,
                textDecoration: "none",
                color: "inherit",
                letterSpacing: 0.2,
              }}
            >
              PonyLife
            </Link>

            <nav style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    opacity: 0.9,
                    fontSize: 14,
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 20px" }}>
          {children}
        </div>

        <footer style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <div
            style={{
              maxWidth: 1080,
              margin: "0 auto",
              padding: "18px 20px",
              fontSize: 13,
              opacity: 0.8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              PonyLife is an experimental coordination platform. Not a financial
              product. No guarantees.
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/docs" style={{ color: "inherit" }}>
                Docs
              </Link>
              <Link href="/transparency" style={{ color: "inherit" }}>
                Transparency
              </Link>
              <Link href="/contact" style={{ color: "inherit" }}>
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
