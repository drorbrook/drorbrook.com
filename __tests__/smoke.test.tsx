import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "@/app/page";
import { site } from "@/data/site";

describe("site smoke tests", () => {
  it("home page renders the hero headline and section tabs", () => {
    render(<HomePage />);
    // Bold hero headline (about-me) is the first heading.
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(site.name);
    // Content sections are exposed as tabs.
    for (const label of ["Blogs", "Podcast", "Talks", "Contact"]) {
      expect(screen.getByRole("tab", { name: label })).toBeInTheDocument();
    }
  });

  it("clicking a tab activates it", async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const talks = screen.getByRole("tab", { name: "Talks" });
    expect(talks).toHaveAttribute("aria-selected", "false");
    await user.click(talks);
    expect(talks).toHaveAttribute("aria-selected", "true");
  });
});
