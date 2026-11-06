"use client";

import { useMemo, useState } from "react";
import { SiteLink } from "@/components/SiteLink";
import type { WorkGroup, WorkItem } from "@/config/content";

const groups: { id: WorkGroup; label: string }[] = [
  { id: "shipped", label: "Shipped" },
  { id: "study", label: "Studies" },
  { id: "experiment", label: "Experiments" },
];

export function WorkList({ items }: { items: WorkItem[] }) {
  const [group, setGroup] = useState<WorkGroup>("shipped");
  const [expanded, setExpanded] = useState(false);
  const counts = useMemo(() => {
    return groups.map((entry) => ({
      ...entry,
      count: items.filter((item) => item.group === entry.id).length,
    }));
  }, [items]);
  const visible = items.filter((item) => item.group === group);
  const shown = expanded ? visible : visible.slice(0, 4);

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Work">
        {counts.map((entry) => {
          const selected = entry.id === group;
          return (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={selected ? "is-selected" : undefined}
              onClick={() => {
                setGroup(entry.id);
                setExpanded(false);
              }}
            >
              {entry.label}
              <span>{entry.count}</span>
            </button>
          );
        })}
      </div>
      <div className="work-list" key={group}>
        {shown.map((item) => (
          <SiteLink key={item.name} href={item.href} className="work-row">
            <span className="work-name">{item.name}</span>
            <span className="work-summary">{item.summary}</span>
            <span className="work-meta">
              {item.meta}
              <i aria-hidden="true" />
            </span>
          </SiteLink>
        ))}
      </div>
      {visible.length > 4 && !expanded ? (
        <button type="button" className="text-button" onClick={() => setExpanded(true)}>
          Show the rest
        </button>
      ) : null}
    </div>
  );
}
