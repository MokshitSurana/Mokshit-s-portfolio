import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { profile } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Writing",
  description: `Writing by ${profile.name}: a neural-networks-from-scratch series, plus notes on other things I'm learning and thinking about.`,
  alternates: { canonical: "/blog" },
};

const container = "mx-auto w-full max-w-[52rem] px-6 sm:px-10";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="relative z-10 min-h-screen pb-28 pt-28">
      <div className={container}>
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
          >
            ← {profile.name}
          </Link>
          <ThemeToggle />
        </div>

        <header className="mt-10 border-b border-line pb-10">
          <p className="mono text-xs uppercase tracking-[0.3em] text-accent sm:text-sm">
            Writing
          </p>
          <h1 className="serif mt-5 text-4xl font-medium tracking-tight sm:text-5xl">
            Notes & essays
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-foreground/70">
            A mix of the technical and the personal. There&rsquo;s a series
            that builds neural networks from scratch, and notes on other
            things I&rsquo;m learning and thinking about along the way.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mono mt-12 text-sm text-muted">Posts coming soon.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block border-b border-line py-8 transition-colors hover:border-accent/30"
                >
                  <p className="mono text-xs tracking-wider text-muted">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="serif mt-2 text-2xl font-medium leading-snug tracking-tight transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-foreground/70">
                    {post.summary}
                  </p>
                  <span className="mono mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-accent">
                    Read
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
