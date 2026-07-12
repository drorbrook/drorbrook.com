"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export const TABS = [
  { id: "about", label: "About" },
  { id: "blogs", label: "Blogs" },
  { id: "podcast", label: "Podcast" },
  { id: "talks", label: "Talks" },
  { id: "contact", label: "Contact" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

export const isTab = (v: string): v is TabId => TABS.some((t) => t.id === v);

// Run before paint on the client (correcting the tab from a deep-link hash
// without a visible flash), but fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type TabsContextValue = {
  active: TabId;
  select: (id: TabId) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

// Holds the active-section state so the tab list (in the header) and the
// content panels (in the page) stay in sync while living in separate trees.
export function TabsProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<TabId>("about");

  // Keep the active tab in sync with the URL hash so deep-links (/#talks)
  // and bookmarks work.
  useIsomorphicLayoutEffect(() => {
    const apply = () => {
      const h = window.location.hash.replace("#", "");
      if (isTab(h)) setActive(h);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const select = (id: TabId) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <TabsContext.Provider value={{ active, select }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabs must be used within a TabsProvider");
  return ctx;
}
