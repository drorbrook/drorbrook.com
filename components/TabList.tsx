"use client";

import { useRef } from "react";
import { TABS, useTabs } from "./TabsContext";

// The segmented pill control. Lives in the header (see Nav); the panels it
// controls live in the page (see SectionPanels), coordinated via TabsContext.
export function TabList({ className = "" }: { className?: string }) {
  const { active, select } = useTabs();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Arrow / Home / End keyboard navigation, per the ARIA tabs pattern.
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = TABS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Sections"
      className={`inline-flex flex-wrap justify-center gap-1 rounded-full border border-border bg-surface/60 p-1 backdrop-blur-sm ${className}`}
    >
      {TABS.map((t, i) => (
        <button
          key={t.id}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          role="tab"
          id={`tab-${t.id}`}
          aria-selected={active === t.id}
          aria-controls={`panel-${t.id}`}
          tabIndex={active === t.id ? 0 : -1}
          onClick={() => select(t.id)}
          onKeyDown={(e) => onKeyDown(e, i)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
            active === t.id ? "btn-gradient" : "text-muted hover:text-fg"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
