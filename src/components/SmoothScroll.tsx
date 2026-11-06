"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { prefersReducedMotion, registerLenis, scrollToId, scrollToTop } from "@/lib/smooth-scroll";

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      autoRaf: true,
    });
    registerLenis(lenis);

    return () => {
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    let tries = 0;
    let timer = 0;
    const run = () => {
      if (hash) {
        if (document.getElementById(hash)) {
          scrollToId(hash);
          timer = window.setTimeout(() => {
            const target = document.getElementById(hash);
            if (!target) return;
            const top = target.getBoundingClientRect().top;
            if (top > 220 || top < 0) scrollToId(hash);
          }, 400);
          return;
        }
        if (tries < 12) {
          tries += 1;
          timer = window.setTimeout(run, 40);
        }
        return;
      }
      scrollToTop(true);
    };
    timer = window.setTimeout(run, 30);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const onPop = () => {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (hash && document.getElementById(hash)) scrollToId(hash);
      else scrollToTop(false);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return null;
}
