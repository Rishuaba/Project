import type Lenis from "lenis";

let lenis: Lenis | null = null;

const HEADER_OFFSET = 0;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenis && !prefersReducedMotion()) {
    lenis.resize();
    lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.1 });
    return;
  }
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

export function scrollToTop(immediate = false) {
  if (lenis) {
    lenis.scrollTo(0, { immediate: immediate || prefersReducedMotion(), duration: 1.05 });
    return;
  }
  window.scrollTo({ top: 0, behavior: "auto" });
}

export function stopSmoothScroll() {
  lenis?.stop();
  document.documentElement.classList.add("scroll-locked");
}

export function startSmoothScroll() {
  document.documentElement.classList.remove("scroll-locked");
  lenis?.start();
}
