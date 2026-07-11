"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BlogCard } from "./BlogCard";
import { TalkCard } from "./TalkCard";
import { blogs } from "@/data/blogs";
import { talks } from "@/data/talks";
import { podcast } from "@/data/podcasts";
import { site } from "@/data/site";

const TABS = [
  { id: "about", label: "About" },
  { id: "blogs", label: "Blogs" },
  { id: "podcast", label: "Podcast" },
  { id: "talks", label: "Talks" },
  { id: "contact", label: "Contact" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const isTab = (v: string): v is TabId => TABS.some((t) => t.id === v);

// Run before paint on the client (correcting the tab from a deep-link hash without
// a visible flash), but fall back to useEffect on the server to avoid the SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function SectionTabs() {
  const [active, setActive] = useState<TabId>("about");
  const ref = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Sync the active tab with the URL hash so nav links (/#talks), deep-links,
  // and bookmarks work. Scroll the tabs into view when the hash changes.
  useIsomorphicLayoutEffect(() => {
    const apply = (scroll: boolean) => {
      const h = window.location.hash.replace("#", "");
      if (isTab(h)) {
        setActive(h);
        if (scroll) ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    apply(false);
    const onHash = () => apply(true);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const select = (id: TabId) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  };

  // Arrow / Home / End keyboard navigation, per the ARIA tabs pattern.
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = TABS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div ref={ref} id="sections" className="scroll-mt-20">
      {/* Tabs sit at the top as a segmented pill control, before any content. */}
      <div
        role="tablist"
        aria-label="Sections"
        className="inline-flex flex-wrap gap-1 rounded-full border border-border bg-surface/60 p-1 backdrop-blur-sm"
      >
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => select(t.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              active === t.id
                ? "btn-gradient text-white shadow"
                : "text-muted hover:text-fg"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="py-10 sm:py-14">
        {/* About — the hero / intro, now the default tab. */}
        <Panel id="about" active={active}>
          <div className="flex flex-col gap-10 sm:flex-row sm:items-center">
            <Avatar />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {"// "}
                {site.tagline}
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Hi, I&apos;m <span className="text-gradient">{site.name}</span>.
              </h1>
              <div className="mt-6 max-w-prose space-y-4 text-lg leading-relaxed text-muted">
                <p>
                  I&apos;m an engineering manager who has spent my career building and
                  growing engineering teams. I care about the craft of leadership as much
                  as the craft of code.
                </p>
                <p>
                  I write and speak about engineering management, host the{" "}
                  <em className="text-fg">Beyond The Sprint</em> podcast, and mentor
                  engineers and managers growing into leadership. The first mentoring call
                  is on me.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={site.schedulerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Book a free mentoring call
                </a>
                <button
                  type="button"
                  onClick={() => select("blogs")}
                  className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  Read my writing
                </button>
              </div>
            </div>
          </div>
        </Panel>

        <Panel id="blogs" active={active}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {blogs.map((blog) => (
              <BlogCard key={blog.url} blog={blog} />
            ))}
          </div>
        </Panel>

        <Panel id="podcast" active={active}>
          <div className="surface-card gradient-ring max-w-prose p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {"// Podcast"}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold">{podcast.name}</h2>
            <p className="mt-3 leading-relaxed text-fg">{podcast.description}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={podcast.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Listen on Spotify
              </a>
              <a
                href={podcast.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                Visit the podcast site
              </a>
            </div>
          </div>
        </Panel>

        <Panel id="talks" active={active}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {talks.map((talk) => (
              <TalkCard key={talk.url} talk={talk} />
            ))}
          </div>
        </Panel>

        <Panel id="contact" active={active}>
          <div className="max-w-prose">
            <p className="leading-relaxed text-fg">
              The best way to reach me is on LinkedIn.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
              >
                LinkedIn
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
              >
                GitHub
              </a>
            </div>

            <div className="surface-card gradient-ring mt-10 p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {"// Mentoring"}
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold">
                The first call is on me
              </h2>
              <p className="mt-3 leading-relaxed text-fg">
                I mentor engineers and managers growing into or through leadership roles.
                The first call is free — a chance to talk through where you are and whether
                I can help.
              </p>
              <a
                href={site.schedulerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5"
              >
                Book a free first call
              </a>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0">
      {/* Glowing gradient ring behind the avatar. */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent to-accent-2 opacity-70 blur-md"
      />
      {site.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={site.photo}
          alt={site.name}
          className="relative h-36 w-36 rounded-full border-2 border-surface object-cover sm:h-44 sm:w-44"
        />
      ) : (
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-surface bg-surface font-serif text-3xl text-muted sm:h-44 sm:w-44">
          DB
        </div>
      )}
    </div>
  );
}

function Panel({
  id,
  active,
  children,
}: {
  id: TabId;
  active: TabId;
  children: React.ReactNode;
}) {
  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
      hidden={active !== id}
      className={active === id ? "animate-fade-up" : undefined}
    >
      {children}
    </div>
  );
}
