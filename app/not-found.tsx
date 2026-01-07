// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "calc(100svh - 1px)",
        display: "grid",
        placeItems: "center",
        padding: "48px 16px",
      }}
    >
      <section style={{ width: "100%", maxWidth: 720 }}>
        {/* Верхняя строка в стиле “production hygiene”: коротко и спокойно */}
        <p style={{ opacity: 0.75, marginBottom: 12 }}>404</p>

        <h1 style={{ fontSize: 28, lineHeight: 1.2, margin: "0 0 10px" }}>
          Страница не найдена
        </h1>

        <p style={{ opacity: 0.8, margin: "0 0 24px" }}>
          Похоже, вы перешли по неверной ссылке или страница была перемещена.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              padding: "0 14px",
              borderRadius: 12,
              border: "1px solid currentColor",
              textDecoration: "none",
            }}
          >
            На главную
          </Link>

          <Link
            href="/catalog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              padding: "0 14px",
              borderRadius: 12,
              border: "1px solid rgba(127,127,127,0.35)",
              textDecoration: "none",
              opacity: 0.9,
            }}
          >
            В каталог
          </Link>
        </div>
      </section>
    </main>
  );
}
