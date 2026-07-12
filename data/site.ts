import type { SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "Dror Brook",
  tagline: "Engineering manager, podcaster, writer & mentor",
  pitch:
    "I lead engineering teams and help managers grow. I write, talk, and host a podcast about the craft of engineering leadership.",
  photo: "/images/profile.jpeg",
  schedulerUrl: "https://cal.com/drorbrook", // TODO: real Calendly / Cal.com link
  companies: ["Monzo", "Meta", "Nvidia"],
  socials: {
    linkedin: "https://www.linkedin.com/in/dror-brook/",
    github: "https://github.com/drorbrook",
  },
};
