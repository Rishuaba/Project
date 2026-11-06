"use client";

import { useEffect, useRef } from "react";
import type { StudioCard } from "@/config/content";

export function StudioStack({ cards }: { cards: StudioCard[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const articles = [...root.querySelectorAll<HTMLElement>(".stack-card")];
      articles.forEach((article, index) => {
        const inner = article.querySelector<HTMLElement>(".stack-card-inner");
        const next = articles[index + 1];
        if (!inner) return;
        if (!next) {
          inner.style.transform = "";
          return;
        }
        const distance = next.getBoundingClientRect().top - article.getBoundingClientRect().top;
        const range = Math.max(window.innerHeight * 0.55, 1);
        const progress = Math.min(1, Math.max(0, 1 - distance / range));
        const scale = 1 - progress * 0.045;
        inner.style.transform = `scale(${scale})`;
      });
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
  }, [cards.length]);

  return (
    <div className="stack" ref={rootRef}>
      {cards.map((card) => (
        <article key={card.index} className="stack-card">
          <div className="stack-card-inner">
            <div>
              <p className="stack-index">{card.index}</p>
              <h3>{card.title}</h3>
              <p>{card.summary}</p>
            </div>
            <ul>
              {card.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
