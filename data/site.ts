import type { SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "Dror Brook",
  tagline: "Engineering manager, podcaster, writer & mentor",
  pitch:
    "I lead engineering teams and help managers grow. I write, talk, and host a podcast about the craft of engineering leadership.",
  photo: "/images/profile.jpeg",
  // Cal.com scheduler (EU region); opened as a popup embed (see BookCallButton).
  schedulerUrl: "https://cal.eu/dror-brook",
  companies: ["Monzo", "Meta", "Nvidia"],
  socials: {
    linkedin: "https://www.linkedin.com/in/dror-brook/",
    github: "https://github.com/drorbrook",
  },
};
