import { ThemeToggle } from "./ThemeToggle";

// The five sections are navigated via the segmented tab control in
// SectionTabs; the header stays minimal (wordmark + theme toggle) so the
// site doesn't show two competing sets of section links.
export function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-bg/70 backdrop-blur-md">
      {/* Gradient hairline under the nav (replaces a flat border). */}
      <div aria-hidden="true" className="hairline bottom-0" />
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <a
          href="/#about"
          className="text-gradient font-serif text-lg font-semibold tracking-tight"
        >
          Dror Brook
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
