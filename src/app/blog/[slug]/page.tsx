import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog";
import { profile } from "@/lib/data";

const container = "mx-auto w-full max-w-3xl px-6 sm:px-10";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { "@type": "Person", name: profile.name },
  };

  return (
    <main className="relative z-10 min-h-screen pb-28 pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className={container}>
        <Link
          href="/blog"
          className="mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
        >
          ← Writing
        </Link>

        <header className="mt-10 border-b border-line pb-10">
          <p className="mono text-xs tracking-wider text-muted">
            {formatDate(post.date)}
          </p>
          <h1 className="serif mt-4 text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
        </header>

        <article className="post mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        <footer className="mt-16 border-t border-line pt-8">
          <Link
            href="/blog"
            className="mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-foreground"
          >
            ← All writing
          </Link>
        </footer>
      </div>
    </main>
  );
}
