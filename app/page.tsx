import { SectionPanels } from "@/components/SectionPanels";
import { getLatestEpisode } from "@/lib/podcast";

// Refresh the latest-episode data hourly (ISR); the rest of the page is static.
export const revalidate = 3600;

export default async function HomePage() {
  const latestEpisode = await getLatestEpisode();

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:py-10">
      {/* Section content; the active tab is chosen from the header (see Nav). */}
      <SectionPanels latestEpisode={latestEpisode} />
    </div>
  );
}
