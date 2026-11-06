"use client";

import { createContext, useContext, useMemo } from "react";
import type { SiteNavigation } from "@/config/navigation";

type NavigationContextValue = {
  nav: SiteNavigation;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({
  initial,
  children,
}: {
  initial: SiteNavigation;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ nav: initial }), [initial]);
  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation() {
  const value = useContext(NavigationContext);
  if (!value) throw new Error("useNavigation must be used within NavigationProvider");
  return value;
}
