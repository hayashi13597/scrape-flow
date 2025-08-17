"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

type Props = {
  children: React.ReactNode;
};

export function ClientClerkProvider({ children }: Props) {
  const [isDark, setIsDark] = useState<boolean>(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  const observerRef = useRef<MutationObserver | null>(null);

  // Keep isDark in sync with <HTML class="dark"> changes
  useEffect(() => {
    const el = document.documentElement;

    const update = () => {
      setIsDark(el.classList.contains("dark"));
    };

    update(); // initial sync

    observerRef.current = new MutationObserver(update);
    observerRef.current.observe(el, {
      attributes: true,
      attributeFilter: ["class"]
    });

    // Also react to "storage" events in case theme is toggled in another tab
    const onStorage = () => update();
    window.addEventListener("storage", onStorage);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const appearance = useMemo(() => {
    return {
      baseTheme: isDark ? dark : undefined,
      elements: {
        formButtonPrimary:
          "!bg-primary hover:bg-primary/90 text-sm !shadow-none"
      }
    };
  }, [isDark]);

  return (
    <ClerkProvider afterSignOutUrl={"/sign-in"} appearance={appearance}>
      {children}
    </ClerkProvider>
  );
}
