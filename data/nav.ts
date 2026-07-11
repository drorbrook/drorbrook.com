// Single-page site: nav links point to in-page section anchors. The hash drives
// the active tab in SectionTabs (see components/SectionTabs.tsx).
export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#blogs", label: "Blogs" },
  { href: "/#podcast", label: "Podcast" },
  { href: "/#talks", label: "Talks" },
  { href: "/#contact", label: "Contact" },
] as const;
