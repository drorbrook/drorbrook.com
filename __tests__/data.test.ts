import { site } from "@/data/site";
import { blogs } from "@/data/blogs";
import { talks } from "@/data/talks";
import { podcast } from "@/data/podcasts";

const isUrl = (v: string) => /^https?:\/\//.test(v);

describe("content data is well-formed", () => {
  it("site config has valid socials and scheduler URLs", () => {
    expect(site.name).toBeTruthy();
    expect(isUrl(site.socials.linkedin)).toBe(true);
    expect(isUrl(site.socials.github)).toBe(true);
    expect(isUrl(site.schedulerUrl)).toBe(true);
  });

  it("every blog has a title and a valid URL", () => {
    expect(blogs.length).toBeGreaterThan(0);
    for (const b of blogs) {
      expect(b.title).toBeTruthy();
      expect(isUrl(b.url)).toBe(true);
    }
  });

  it("every talk has a title and a valid URL (and embed URL when present)", () => {
    expect(talks.length).toBeGreaterThan(0);
    for (const t of talks) {
      expect(t.title).toBeTruthy();
      expect(isUrl(t.url)).toBe(true);
      if (t.embedUrl) expect(isUrl(t.embedUrl)).toBe(true);
    }
  });

  it("podcast has valid Spotify and site URLs", () => {
    expect(isUrl(podcast.spotifyUrl)).toBe(true);
    expect(isUrl(podcast.siteUrl)).toBe(true);
  });
});
