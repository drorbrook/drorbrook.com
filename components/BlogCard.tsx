import type { Blog } from "@/data/types";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Parse date-only ISO strings (YYYY-MM-DD) as calendar components so the label
// doesn't shift a month in negative-offset timezones (a `new Date("2025-03-01")`
// is UTC midnight and would render "Feb" in the Americas).
function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?/.exec(iso);
  if (!m) return "";
  const year = m[1];
  const month = MONTHS[Number(m[2]) - 1];
  return month ? `${month} ${year}` : "";
}

export function BlogCard({ blog }: { blog: Blog }) {
  const date = formatDate(blog.date);
  return (
    <a
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      className="surface-card gradient-ring group flex flex-col overflow-hidden p-6"
    >
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted">
        <span>{blog.publication}</span>
        {date && (
          <>
            <span aria-hidden="true">·</span>
            <span>{date}</span>
          </>
        )}
      </div>
      <h3 className="mt-2 font-serif text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
        {blog.title}
      </h3>
      <p className="mt-2 text-sm text-muted">{blog.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Read
        <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
          →
        </span>
      </span>
    </a>
  );
}
