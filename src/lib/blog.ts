import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
};

function parseFile(filename: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const slug =
    (data.slug as string) ?? filename.replace(/^\d+-/, "").replace(/\.md$/, "");
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    summary: data.summary ?? "",
    content,
  };
}

/** All posts, newest first (filenames are zero-padded for stable ordering). */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parseFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  // Parse YYYY-MM-DD as a local calendar date so it doesn't shift a day
  // backward in negative-offset timezones (new Date("...") parses as UTC).
  const [y, m, d] = iso.split("-").map(Number);
  const date =
    y && m && d ? new Date(y, m - 1, d) : new Date(iso);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
