type PageProps = {
  params: { slug: string };
};

export default function WorkDetailPage({ params }: PageProps) {
  return (
    <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>
        Work: {params.slug}
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.6 }}>
        This is a placeholder work detail page. Later we’ll load real work data
        by slug.
      </p>
    </main>
  );
}
