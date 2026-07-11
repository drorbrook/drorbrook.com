import type { Blog } from "./types";

export const blogs: Blog[] = [
  {
    title: "Creating Impactful Products Through Iterative Development",
    publication: "Medium",
    url: "https://medium.com/@drorbrook1/creating-impactful-products-through-iterative-development-96a9ffe28cd2",
    date: "2025-02-27",
    description:
      "How iterative development — repeated cycles of planning, design, testing, and review — lets teams adapt quickly, gather early feedback, and ship faster than traditional approaches.",
  },
  {
    title: "5 Tips for Effective Onboarding of a New Team Member",
    publication: "Medium",
    url: "https://medium.com/@drorbrook1/5-tips-for-effective-onboarding-of-a-new-team-member-e9d06cb9ab8c",
    date: "2025-05-20",
    description:
      "Five strategies for onboarding new team members well: handle the admin basics, set a structured plan, assign a peer buddy, delegate meaningful work gradually, and give consistent feedback.",
  },
  // TODO: add further articles here — one object per post (spec §9).
];
