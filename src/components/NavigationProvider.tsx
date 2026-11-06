"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { SiteNavigation } from "@/config/navigation";
import { NAV_STORAGE_KEY, sanitizeNavigation } from "@/lib/navigation";

type NavigationContextValue = {
  nav: SiteNavigation;
  customized: boolean;
  update: (next: SiteNavigation) => void;
  reset: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({
  initial,
  children,
}: {
  initial: SiteNavigation;
  children: React.ReactNode;
}) {
  const [nav, setNav] = useState(initial);
  const [customized, setCustomized] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(NAV_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { customized?: boolean; navigation?: unknown };
      if (!parsed.customized) return;
      const clean = sanitizeNavigation(parsed.navigation);
      if (!clean) return;
      setNav(clean);
      setCustomized(true);
    } catch {
      localStorage.removeItem(NAV_STORAGE_KEY);
    }
  }, []);

  const update = useCallback((next: SiteNavigation) => {
    setNav(next);
    setCustomized(true);
    try {
      localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify({ customized: true, navigation: next }));
    } catch {
      // The menu still updates on the page if the browser store is full.
    }
  }, []);

  const reset = useCallback(() => {
    setNav(initial);
    setCustomized(false);
    localStorage.removeItem(NAV_STORAGE_KEY);
  }, [initial]);

  const value = useMemo(
    () => ({ nav, customized, update, reset }),
    [nav, customized, update, reset],
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const value = useContext(NavigationContext);
  if (!value) throw new Error("useNavigation must be used within NavigationProvider");
  return value;
}
