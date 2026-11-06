"use client";

import { useNavigation } from "@/components/NavigationProvider";

export function BrandName() {
  const { nav } = useNavigation();
  return <>{nav.brand.name}</>;
}
