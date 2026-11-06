"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/components/NavigationProvider";
import { SiteLink } from "@/components/SiteLink";
import { forPlacement, hashIds, linkIsCurrent, menuLabel } from "@/lib/navigation";
import { startSmoothScroll, stopSmoothScroll } from "@/lib/smooth-scroll";
import type { NavLink } from "@/config/navigation";

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 40" aria-hidden="true">
      <rect width="64" height="40" rx="20" fill="currentColor" />
      <circle cx="24" cy="20" r="6" fill="none" stroke="var(--paper)" strokeWidth="1.6" />
      <path d="M36 14h12M36 20h12M36 26h8" stroke="var(--gold-2)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Submenu({ item, pathname, activeId }: { item: NavLink; pathname: string; activeId: string }) {
  const children = item.children ?? [];
  if (!children.length) return null;
  return (
    <div className="submenu">
      <div className="submenu-panel">
        {children.map((child) => (
          <SiteLink
            key={child.id}
            href={child.href}
            className="submenu-link"
            current={linkIsCurrent(child, pathname, activeId)}
          >
            <span>{menuLabel(child.label)}</span>
            {child.note ? <small>{child.note}</small> : null}
          </SiteLink>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const { nav } = useNavigation();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [progress, setProgress] = useState(0);
  const items = forPlacement(nav.items, "header");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) stopSmoothScroll();
    else startSmoothScroll();
    return () => startSmoothScroll();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const wanted = new Set(hashIds(nav.items));
    let frame = 0;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 12);

      if (pathname !== "/") {
        setActiveId("");
        return;
      }
      const line = window.innerHeight * 0.32;
      let current = "";
      for (const element of document.querySelectorAll<HTMLElement>("main [id]")) {
        if (!wanted.has(element.id)) continue;
        if (element.getBoundingClientRect().top <= line) current = element.id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [nav.items, pathname]);

  const showCta = !nav.cta.hidden && nav.cta.label.trim().length > 0;

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <SiteLink href="/#top" className="skip">
        Skip to content
      </SiteLink>
      <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
        <div className="header-inner">
          <SiteLink href={nav.brand.href} className="brand" onNavigate={() => setOpen(false)}>
            <Mark className="brand-mark" />
            <span>{nav.brand.name}</span>
          </SiteLink>

          <nav className="desktop-nav" aria-label="Primary">
            <ul>
              {items.map((item) => {
                const current = linkIsCurrent(item, pathname, activeId);
                return (
                  <li key={item.id} className={item.children?.length ? "has-sub" : undefined}>
                    <SiteLink href={item.href} className="nav-link" current={current}>
                      {menuLabel(item.label)}
                    </SiteLink>
                    <Submenu item={item} pathname={pathname} activeId={activeId} />
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-actions">
            {showCta ? (
              <SiteLink href={nav.cta.href} className="cta" onNavigate={() => setOpen(false)}>
                {nav.cta.label}
              </SiteLink>
            ) : null}
            <button
              type="button"
              className="menu-button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} hidden={!open}>
        <nav aria-label="Mobile" data-lenis-prevent>
          {items.map((item) => (
            <div key={item.id} className="mobile-group">
              <SiteLink
                href={item.href}
                className="mobile-link"
                current={linkIsCurrent(item, pathname, activeId)}
                onNavigate={() => setOpen(false)}
              >
                {menuLabel(item.label)}
              </SiteLink>
              {item.children?.length ? (
                <div className="mobile-sub">
                  {item.children.map((child) => (
                    <SiteLink
                      key={child.id}
                      href={child.href}
                      onNavigate={() => setOpen(false)}
                      current={linkIsCurrent(child, pathname, activeId)}
                    >
                      {menuLabel(child.label)}
                    </SiteLink>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
