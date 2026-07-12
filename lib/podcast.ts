import { cache } from "react";
import Parser from "rss-parser";

// Same public RSS feed the Beyond The Sprint site reads. Override via env if it
// ever moves. Fetched server-side; the page revalidates hourly.
const RSS_FEED_URL =
  process.env.PODCAST_RSS_URL ?? "https://anchor.fm/s/10066ba10/podcast/rss";

export interface LatestEpisode {
  title: string;
  /** Episode page URL (Spotify for Podcasters). */
  link: string;
  /** Preformatted, e.g. "1 Jul 2026" - computed server-side to avoid hydration drift. */
  dateLabel: string;
  /** Preformatted, e.g. "32 min". */
  durationLabel?: string;
  episodeNumber?: number;
}

type FeedItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  itunes?: { duration?: string; episode?: string };
};

const getFeed = cache(async () => {
  const parser = new Parser<Record<string, unknown>, FeedItem>({
    customFields: {
      item: [
        ["itunes:duration", "itunes.duration"],
        ["itunes:episode", "itunes.episode"],
      ],
    },
  });
  return parser.parseURL(RSS_FEED_URL);
});

// "00:32:06" | "1926" (seconds) | "32:06" -> "32 min"
function formatDuration(raw?: string): string | undefined {
  if (!raw) return undefined;
  const parts = raw.split(":").map(Number);
  if (parts.some(Number.isNaN)) return undefined;
  let minutes: number;
  if (parts.length === 3) minutes = parts[0] * 60 + parts[1];
  else if (parts.length === 2) minutes = parts[0];
  else minutes = Math.round(parts[0] / 60); // bare seconds
  return minutes > 0 ? `${minutes} min` : undefined;
}

function formatDate(pubDate?: string): string {
  if (!pubDate) return "";
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Latest episode, or null if the feed is unreachable/empty (the podcast panel
// falls back to its static links, so a fetch failure never breaks the page).
export const getLatestEpisode = cache(async (): Promise<LatestEpisode | null> => {
  try {
    const feed = await getFeed();
    const item = feed.items?.[0];
    if (!item?.title) return null;
    return {
      title: item.title,
      link: item.link ?? "",
      dateLabel: formatDate(item.pubDate),
      durationLabel: formatDuration(item.itunes?.duration),
      episodeNumber: item.itunes?.episode
        ? parseInt(item.itunes.episode, 10)
        : undefined,
    };
  } catch {
    return null;
  }
});
