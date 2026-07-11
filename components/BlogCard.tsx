import type { Blog } from "@/data/types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "short" });
}

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <a
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
        <span>{blog.publication}</span>
        {formatDate(blog.date) && (
          <>
            <span aria-hidden="true">·</span>
            <span>{formatDate(blog.date)}</span>
          </>
        )}
      </div>
      <h3 className="mt-2 font-serif text-lg font-semibold leading-snug group-hover:text-accent">
        {blog.title}
      </h3>
      <p className="mt-2 text-sm text-muted">{blog.description}</p>
      <span className="mt-4 text-sm font-medium text-accent">Read →</span>
    </a>
  );
}
