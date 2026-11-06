"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { internalParts, safeHref } from "@/lib/navigation";
import { scrollToId } from "@/lib/smooth-scroll";

type SiteLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  current?: boolean;
};

export function SiteLink({ href, className, children, onNavigate, current }: SiteLinkProps) {
  const pathname = usePathname();
  const safe = safeHref(href);

  if (!safe) {
    return <span className={className}>{children}</span>;
  }

  if (safe.startsWith("http")) {
    return (
      <a className={className} href={safe} target="_blank" rel="noreferrer" onClick={() => onNavigate?.()}>
        {children}
      </a>
    );
  }

  const parts = internalParts(safe);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (!parts?.hash) return;
    const samePage = safe.startsWith("#") || parts.pathname === pathname;
    if (!samePage) return;
    const id = parts.hash.slice(1);
    if (!document.getElementById(id)) return;
    event.preventDefault();
    scrollToId(id);
    const nextUrl = `${pathname}${parts.hash}`;
    if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
      window.history.pushState(null, "", nextUrl);
    }
  };

  return (
    <Link
      href={safe}
      scroll={false}
      className={className}
      aria-current={current ? "true" : undefined}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
