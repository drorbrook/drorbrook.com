import type { Talk } from "@/data/types";

export function TalkCard({ talk }: { talk: Talk }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface">
      {talk.embedUrl ? (
        // Fixed 16:9 wrapper reserves space so the iframe doesn't cause layout shift.
        <div className="embed-16x9">
          <iframe
            src={talk.embedUrl}
            title={talk.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <a
          href={talk.url}
          target="_blank"
          rel="noopener noreferrer"
          className="embed-16x9 flex items-center justify-center bg-bg text-sm font-medium text-accent"
          aria-label={`Watch: ${talk.title}`}
        >
          Watch on {talk.platform} →
        </a>
      )}
      <div className="p-5">
        <p className="text-xs uppercase tracking-wide text-muted">
          {talk.platform}
        </p>
        <h3 className="mt-2 font-serif text-lg font-semibold leading-snug">
          {talk.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{talk.description}</p>
      </div>
    </article>
  );
}
