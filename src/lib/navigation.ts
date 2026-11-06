import type { NavLink, SiteNavigation } from "@/config/navigation";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function safeHref(href: string): string | null {
  const value = href.trim();
  if (!value || value.length > 300) return null;
  if (value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\")) return value;
  if (value.startsWith("#") && !value.startsWith("#//")) return value;
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return url.toString();
  } catch {
    return null;
  }
  return null;
}

export function internalParts(href: string): { pathname: string; hash: string } | null {
  const safe = safeHref(href);
  if (!safe || safe.startsWith("http")) return null;
  const url = new URL(safe, "http://ida.local");
  return { pathname: url.pathname, hash: decodeURIComponent(url.hash) };
}

export function describeHref(href: string): string {
  const safe = safeHref(href);
  if (!safe) return "Use /#section, /page, or https://";
  if (safe.startsWith("http")) return "External site";
  if (safe.includes("#")) return "Section on this site";
  return "Page on this site";
}

function cleanLink(value: unknown, depth: number): NavLink | null {
  if (!isRecord(value) || depth > 1) return null;
  const id = typeof value.id === "string" ? value.id.trim().slice(0, 40) : "";
  if (!/^[a-zA-Z0-9-_]+$/.test(id)) return null;
  const label = typeof value.label === "string" ? value.label.trim().slice(0, 48) : "";
  const href = typeof value.href === "string" ? value.href.trim().slice(0, 300) : "";
  if (!href) return null;

  const link: NavLink = { id, label, href };
  if (value.hidden === true) link.hidden = true;
  if (typeof value.note === "string" && value.note.trim()) {
    link.note = value.note.trim().slice(0, 90);
  }
  if (depth === 0 && (value.placement === "header" || value.placement === "footer")) {
    link.placement = value.placement;
  } else if (depth === 0 && value.placement === "both") {
    // "both" is the default, so the file stays shorter when this is omitted.
  }
  if (depth === 0 && Array.isArray(value.children)) {
    const children = value.children
      .map((child) => cleanLink(child, 1))
      .filter((child): child is NavLink => child !== null)
      .slice(0, 8);
    if (children.length) link.children = children;
  }
  return link;
}

export function sanitizeNavigation(value: unknown): SiteNavigation | null {
  if (!isRecord(value) || !isRecord(value.brand) || !isRecord(value.cta) || !Array.isArray(value.items)) {
    return null;
  }

  const name = typeof value.brand.name === "string" ? value.brand.name.trim().slice(0, 48) : "";
  const brandHref = typeof value.brand.href === "string" ? value.brand.href.trim().slice(0, 300) : "";
  const ctaLabel = typeof value.cta.label === "string" ? value.cta.label.trim().slice(0, 48) : "";
  const ctaHref = typeof value.cta.href === "string" ? value.cta.href.trim().slice(0, 300) : "";
  if (!name || !brandHref || !ctaHref) return null;

  const seen = new Set<string>();
  const items: NavLink[] = [];
  for (const item of value.items) {
    const link = cleanLink(item, 0);
    if (!link || seen.has(link.id)) continue;
    seen.add(link.id);
    if (link.children) {
      link.children = link.children.filter((child) => {
        if (seen.has(child.id)) return false;
        seen.add(child.id);
        return true;
      });
      if (!link.children.length) delete link.children;
    }
    items.push(link);
    if (items.length >= 16) break;
  }
  if (!items.length) return null;

  const navigation: SiteNavigation = {
    brand: { name, href: brandHref },
    cta: { label: ctaLabel, href: ctaHref },
    items,
  };
  if (value.cta.hidden === true) navigation.cta.hidden = true;
  return navigation;
}

export function forPlacement(items: NavLink[], where: "header" | "footer"): NavLink[] {
  return items
    .filter((item) => {
      if (item.hidden) return false;
      if (where === "header" && item.placement === "footer") return false;
      if (where === "footer" && item.placement === "header") return false;
      return true;
    })
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) => !child.hidden),
    }));
}

export function hashIds(items: NavLink[]): string[] {
  const ids: string[] = [];
  const walk = (links: NavLink[]) => {
    for (const link of links) {
      const parts = internalParts(link.href);
      if (parts?.hash.startsWith("#")) ids.push(parts.hash.slice(1));
      if (link.children) walk(link.children);
    }
  };
  walk(items);
  return ids;
}

export function linkIsCurrent(link: NavLink, pathname: string, activeId: string): boolean {
  const parts = internalParts(link.href);
  const children = link.children ?? [];

  const childRoute = children.some((child) => {
    const childParts = internalParts(child.href);
    if (!childParts || childParts.hash) return false;
    if (childParts.pathname === "/") return false;
    return pathname === childParts.pathname || pathname.startsWith(`${childParts.pathname}/`);
  });
  if (childRoute) return true;
  if (!parts) return false;

  if (parts.hash) {
    if (pathname !== parts.pathname) return false;
    if (parts.hash.slice(1) === activeId) return true;
    return children.some((child) => {
      const childParts = internalParts(child.href);
      return childParts?.pathname === pathname && childParts.hash.slice(1) === activeId;
    });
  }

  if (parts.pathname === "/") return false;
  return pathname === parts.pathname || pathname.startsWith(`${parts.pathname}/`);
}

export function menuLabel(label: string): string {
  const trimmed = label.trim();
  return trimmed || "Untitled";
}
