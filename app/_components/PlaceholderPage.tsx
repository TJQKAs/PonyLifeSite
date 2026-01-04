// app/_components/PlaceholderPage.tsx

type Props = {
  title: string;
  description?: string;
};

export default function PlaceholderPage({ title, description }: Props) {
  return (
    <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>{title}</h1>
      {description ? (
        <p style={{ fontSize: 16, lineHeight: 1.6 }}>{description}</p>
      ) : null}
      <div style={{ marginTop: 24, fontSize: 13, opacity: 0.7 }}>
        Placeholder page — replace with real content anytime.
      </div>
    </main>
  );
}
