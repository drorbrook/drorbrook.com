import { SectionTabs } from "@/components/SectionTabs";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:py-10">
      {/* Tabs at the top; the About tab (default) introduces Dror. */}
      <SectionTabs />
    </div>
  );
}
