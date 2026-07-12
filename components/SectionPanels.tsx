"use client";

import { BlogCard } from "./BlogCard";
import { TalkCard } from "./TalkCard";
import { useTabs, type TabId } from "./TabsContext";
import { blogs } from "@/data/blogs";
import { talks } from "@/data/talks";
import { podcast } from "@/data/podcasts";
import { site } from "@/data/site";
import type { LatestEpisode } from "@/lib/podcast";

// The content for each section. The active tab is driven by the header's
// TabList through TabsContext; this component just shows the matching panel.
// `latestEpisode` is fetched server-side (see app/page.tsx); null if the feed
// was unreachable, in which case the podcast panel uses its static links.
export function SectionPanels({
  latestEpisode,
}: {
  latestEpisode: LatestEpisode | null;
}) {
  const { active } = useTabs();

  return (
    <div id="sections" className="scroll-mt-24 py-10 sm:py-14">
      {/* About - the hero / intro, the default tab. */}
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
                I&apos;m an engineering manager at Monzo, one of the biggest neo-banks
                in the UK. I stay close to my engineers and the work,
                and I care about the craft of leadership as much as the craft of code.
              </p>
              <p>
                I write and speak about engineering management, host the{" "}
                <em className="text-fg">Beyond The Sprint</em> podcast alongside my great
                friend Meir Renford, and mentor engineers and managers growing into
                leadership.
              </p>
              <p>The first mentoring call is on me.</p>
            </div>
            <div className="mt-8">
              <a
                href={site.schedulerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book a free mentoring call
              </a>
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
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {podcast.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={podcast.coverImage}
                alt={`${podcast.name} cover art`}
                className="h-28 w-28 shrink-0 rounded-2xl border border-border object-cover shadow-lg sm:h-32 sm:w-32"
              />
            )}
            <div>
              <p className="eyebrow">Podcast</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold">{podcast.name}</h2>
              <p className="mt-1 text-sm text-muted">
                Hosted by {site.name} and Meir Renford
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 leading-relaxed text-fg">
            <p>
              Beyond The Sprint is a podcast about the parts of engineering
              leadership that don&apos;t fit on a sprint board - the messy, human
              parts of the job.
            </p>
            <p>
              Each episode digs into a real challenge tech leads and engineering
              managers actually face: hiring and firing, one-on-ones that go
              sideways, underperformance, promotions, and the everyday judgment
              calls no framework fully prepares you for.
            </p>
            <p>
              No theoretical models, no leadership platitudes - just honest
              conversations about what the work is really like.
            </p>
          </div>

          {latestEpisode && (
            // The RSS-driven latest episode, as a clickable card.
            <a
              href={latestEpisode.link || podcast.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 block rounded-xl border border-border bg-bg/40 p-4 transition-colors hover:border-accent"
            >
              <p className="eyebrow">Latest episode</p>
              <p className="mt-1 font-medium text-fg transition-colors group-hover:text-accent">
                {latestEpisode.title}
              </p>
              <p className="mt-0.5 text-sm text-muted">
                {[
                  latestEpisode.episodeNumber
                    ? `Episode ${latestEpisode.episodeNumber}`
                    : null,
                  latestEpisode.durationLabel,
                  latestEpisode.dateLabel,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Listen
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
            </a>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={podcast.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {latestEpisode ? "All episodes on Spotify" : "Listen on Spotify"}
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
        <div className="max-w-2xl">
          <p className="eyebrow">Get in touch</p>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/my_family.jpeg"
              alt="Dror Brook with his family"
              className="h-44 w-44 shrink-0 rounded-2xl border border-border object-cover shadow-lg sm:h-52 sm:w-52"
            />
            <div className="space-y-3 leading-relaxed text-fg">
              <p>
                I&apos;ve spent my career leading engineering teams at some of
                tech&apos;s most demanding companies. I am always happy to meet
                new people - reach out to me on{" "}
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  LinkedIn
                </a>
                .
              </p>
              <p>
                Outside of work, most of my time goes to my family - they keep me
                grounded and are a good reminder of why the balance we talk about
                as managers actually matters.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {site.companies.map((company) => (
              <span
                key={company}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/70 px-3 py-1 font-mono text-xs tracking-wide text-muted"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/logos/${company.toLowerCase()}.svg`}
                  alt=""
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />
                {company}
              </span>
            ))}
          </div>

          <div className="surface-card gradient-ring mt-10 p-8">
            <p className="eyebrow">Mentoring</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold">
              The first call is on me
            </h2>
            <p className="mt-3 leading-relaxed text-fg">
              I mentor engineers and managers growing into or through leadership roles.
              Whether you&apos;re stepping up as a manager or facing a hard call at work,
              the first call is free - a chance to talk through where you are and whether
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
    <div className="relative w-36 shrink-0 sm:w-44">
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
