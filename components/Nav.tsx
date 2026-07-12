import { ThemeToggle } from "./ThemeToggle";
import { TabList } from "./TabList";

// Header: wordmark on the left; the section tab control sits just left of the
// theme toggle. On narrow screens the tab control wraps to its own row.
export function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-bg/70 backdrop-blur-md">
      {/* Gradient hairline under the nav (replaces a flat border). */}
      <div aria-hidden="true" className="hairline bottom-0" />
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-3 px-5 py-3">
        <a
          href="/#about"
          className="mr-auto text-gradient font-serif text-lg font-semibold tracking-tight"
        >
          Dror Brook
        </a>
        <TabList className="order-last w-full md:order-none md:w-auto" />
        <ThemeToggle />
      </nav>
    </header>
  );
}
