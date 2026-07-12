import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "@/app/page";
import { TabsProvider } from "@/components/TabsContext";
import { TabList } from "@/components/TabList";
import { site } from "@/data/site";

// The tab control (header) and the section panels (page) live in separate
// trees wired together by TabsProvider, so mount both under the provider.
function App() {
  return (
    <TabsProvider>
      <TabList />
      <HomePage />
    </TabsProvider>
  );
}

describe("site smoke tests", () => {
  it("home page renders the hero headline and section tabs", () => {
    render(<App />);
    // Bold hero headline (about-me) is the first heading.
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(site.name);
    // Content sections are exposed as tabs.
    for (const label of ["Blogs", "Podcast", "Talks", "Contact"]) {
      expect(screen.getByRole("tab", { name: label })).toBeInTheDocument();
    }
  });

  it("clicking a tab activates it and reveals its panel", async () => {
    const user = userEvent.setup();
    render(<App />);
    const talks = screen.getByRole("tab", { name: "Talks" });
    expect(talks).toHaveAttribute("aria-selected", "false");
    await user.click(talks);
    expect(talks).toHaveAttribute("aria-selected", "true");
    // The corresponding panel is now the visible one.
    expect(screen.getByRole("tabpanel", { hidden: false })).toHaveAttribute(
      "id",
      "panel-talks",
    );
  });
});
