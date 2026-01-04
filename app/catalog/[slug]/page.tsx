// app/catalog/[slug]/page.tsx
"use client";

import { useMemo } from "react";

type PageProps = {
  params: { slug: string };
};

export default function WorkDetailPage({ params }: PageProps) {
  const slug = useMemo(() => params.slug, [params.slug]);

  return (
    <main style={{ padding: 24 }}>
      <h1>Work: {slug}</h1>
    </main>
  );
}
