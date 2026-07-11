"use client";

import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { navLinks } from "@/data/nav";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-bg/70 backdrop-blur-xl">
      {/* Gradient hairline under the nav (replaces a flat border). */}
      <div aria-hidden="true" className="hairline bottom-0" />
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <a
          href="/#about"
          className="text-gradient font-serif text-lg font-semibold tracking-tight"
        >
          Dror Brook
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-underline text-muted transition-colors hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border md:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col px-5 py-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-base text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
