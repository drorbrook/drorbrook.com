"use client";

import { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo } from "react";

// Opens the Cal.com scheduler in a popup overlay instead of navigating away.
// Everything is derived from the public booking URL so there's one source of
// truth (data/site.ts). The popup theme follows the site's dark-mode toggle so
// it never clashes with the page behind it.
export function BookCallButton({
  schedulerUrl,
  className,
  children,
}: {
  /** Public Cal.com booking URL, e.g. "https://cal.eu/dror-brook". */
  schedulerUrl: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  const { calLink, origin, embedJsUrl } = useMemo(() => {
    const url = new URL(schedulerUrl);
    // Cal.com serves each account's embed from an "app." subdomain of its data
    // region (app.cal.com, app.cal.eu, ...). Derive it from the booking host.
    const embedOrigin = `${url.protocol}//app.${url.hostname}`;
    return {
      calLink: url.pathname.replace(/^\/+/, ""),
      origin: embedOrigin,
      embedJsUrl: `${embedOrigin}/embed/embed.js`,
    };
  }, [schedulerUrl]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ embedJsUrl });
      if (cancelled) return;
      cal("ui", {
        theme: resolvedTheme === "dark" ? "dark" : "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [resolvedTheme, embedJsUrl]);

  // Rendered as a real link, not a button: Cal's embed intercepts the click
  // (via the data-cal-* attributes) and opens the popup when its script has
  // loaded. If the script is blocked or still loading, the href takes over and
  // the visitor still reaches the booking page - the CTA never dead-ends.
  return (
    <a
      href={schedulerUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cal-link={calLink}
      data-cal-origin={origin}
      data-cal-config='{"layout":"month_view"}'
      className={className}
    >
      {children}
    </a>
  );
}
