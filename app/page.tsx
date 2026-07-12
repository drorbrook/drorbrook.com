import { SectionPanels } from "@/components/SectionPanels";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:py-10">
      {/* Section content; the active tab is chosen from the header (see Nav). */}
      <SectionPanels />
    </div>
  );
}
