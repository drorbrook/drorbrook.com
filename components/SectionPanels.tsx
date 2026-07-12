"use client";

import { BlogCard } from "./BlogCard";
import { TalkCard } from "./TalkCard";
import { useTabs, type TabId } from "./TabsContext";
import { blogs } from "@/data/blogs";
import { talks } from "@/data/talks";
import { podcast } from "@/data/podcasts";
import { site } from "@/data/site";

// The content for each section. The active tab is driven by the header's
// TabList through TabsContext; this component just shows the matching panel.
export function SectionPanels() {
  const { active, select } = useTabs();

  return (
    <div id="sections" className="scroll-mt-24 py-10 sm:py-14">
      {/* About — the hero / intro, the default tab. */}
      <Panel id="about" active={active}>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-center">
          <Avatar />
          <div>
            <p className="eyebrow">{site.tagline}</p>
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
                className="btn-outline"
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
          <p className="eyebrow">Podcast</p>
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
              className="btn-outline"
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
            <p className="eyebrow">Mentoring</p>
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
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0">
      {/* Glowing gradient ring behind the avatar. */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-full bg-[image:var(--gradient-accent)] opacity-70 blur-md"
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
