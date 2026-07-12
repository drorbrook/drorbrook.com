export interface SiteConfig {
  name: string;
  tagline: string;
  /** One-line pitch used on the home hero. */
  pitch: string;
  /** Path to the profile photo under /public, e.g. "/profile.jpg". Omit to show initials. */
  photo?: string;
  /** External scheduler (Calendly / Cal.com) for the free mentoring call. */
  schedulerUrl: string;
  /** Notable companies, most recent first, shown as chips on Contact. */
  companies: string[];
  socials: {
    linkedin: string;
    github: string;
  };
}

export interface Blog {
  title: string;
  publication: string;
  url: string;
  /** ISO date string, e.g. "2024-03-01". */
  date: string;
  description: string;
}

export interface Talk {
  title: string;
  platform: string;
  url: string;
  /** YouTube/Vimeo embed URL. When set, the talk renders as an inline player. */
  embedUrl?: string;
  thumbnail?: string;
  description: string;
}

export interface Podcast {
  name: string;
  description: string;
  spotifyUrl: string;
  siteUrl: string;
  /** Path to square cover art under /public, e.g. "/images/logo_podcast.png". Omit to hide. */
  coverImage?: string;
}
