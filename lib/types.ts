export type Work = {
  slug: string;
  title: string;
  creator: string;
  medium: string;
  language?: string;
  status: "New" | "Active" | "Archived" | string;
  tags: string[];
  summary: string;
  coverImage?: string;
  description?: string[];
  participation?: Array<{ title: string; text: string }>;
};
