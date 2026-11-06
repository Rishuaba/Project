"use client";

import { useEffect, useRef, useState } from "react";
import type { NavLink, NavPlacement, SiteNavigation } from "@/config/navigation";
import { useNavigation } from "@/components/NavigationProvider";
import { collectIds, createNavLink, describeHref, toNavigationSource } from "@/lib/navigation";

function patchLink(items: NavLink[], id: string, patch: Partial<NavLink>): NavLink[] {
  return items.map((item) => {
    if (item.id === id) return { ...item, ...patch };
    if (!item.children?.length) return item;
    return { ...item, children: patchLink(item.children, id, patch) };
  });
}

function moveLink(items: NavLink[], id: string, direction: -1 | 1): NavLink[] {
  const index = items.findIndex((item) => item.id === id);
  if (index >= 0) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) return items;
    const next = items.slice();
    const [item] = next.splice(index, 1);
    if (!item) return items;
    next.splice(nextIndex, 0, item);
    return next;
  }
  return items.map((item) =>
    item.children?.length ? { ...item, children: moveLink(item.children, id, direction) } : item,
  );
}

function removeLink(items: NavLink[], id: string): NavLink[] {
  return items
    .filter((item) => item.id !== id)
    .map((item) =>
      item.children?.length ? { ...item, children: removeLink(item.children, id) } : item,
    );
}

function addChild(items: NavLink[], parentId: string, child: NavLink): NavLink[] {
  return items.map((item) =>
    item.id === parentId ? { ...item, children: [...(item.children ?? []), child] } : item,
  );
}

function LinkFields({
  item,
  depth,
  onChange,
  onMove,
  onRemove,
  onAddChild,
}: {
  item: NavLink;
  depth: number;
  onChange: (id: string, patch: Partial<NavLink>) => void;
  onMove: (id: string, direction: -1 | 1) => void;
  onRemove: (id: string) => void;
  onAddChild: (parentId: string) => void;
}) {
  return (
    <fieldset className={`editor-item${item.hidden ? " is-hidden" : ""}`}>
      <legend>{item.label.trim() || "Untitled"}</legend>
      <label>
        Label
        <input
          value={item.label}
          maxLength={48}
          autoComplete="off"
          onChange={(event) => onChange(item.id, { label: event.target.value })}
        />
      </label>
      <label>
        Link
        <input
          value={item.href}
          maxLength={300}
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => onChange(item.id, { href: event.target.value })}
        />
        <small>{describeHref(item.href)}</small>
      </label>
      <label>
        Dropdown note
        <input
          value={item.note ?? ""}
          maxLength={90}
          autoComplete="off"
          onChange={(event) => onChange(item.id, { note: event.target.value })}
        />
      </label>
      {depth === 0 ? (
        <label>
          Show in
          <select
            value={item.placement ?? "both"}
            onChange={(event) =>
              onChange(item.id, { placement: event.target.value as NavPlacement })
            }
          >
            <option value="both">Header and footer</option>
            <option value="header">Header only</option>
            <option value="footer">Footer only</option>
          </select>
        </label>
      ) : null}
      <div className="editor-row">
        <label className="check">
          <input
            type="checkbox"
            checked={item.hidden === true}
            onChange={(event) => onChange(item.id, { hidden: event.target.checked })}
          />
          Hide
        </label>
        <button type="button" onClick={() => onMove(item.id, -1)}>
          Up
        </button>
        <button type="button" onClick={() => onMove(item.id, 1)}>
          Down
        </button>
        {depth === 0 ? (
          <button type="button" onClick={() => onAddChild(item.id)}>
            Add dropdown link
          </button>
        ) : null}
        <button type="button" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
      {item.children?.map((child) => (
        <LinkFields
          key={child.id}
          item={child}
          depth={depth + 1}
          onChange={onChange}
          onMove={onMove}
          onRemove={onRemove}
          onAddChild={onAddChild}
        />
      ))}
    </fieldset>
  );
}

export function NavEditor() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { nav, update, reset, customized } = useNavigation();
  const [copied, setCopied] = useState<"idle" | "copied" | "manual">("idle");
  const [confirmReset, setConfirmReset] = useState(false);
  const source = toNavigationSource(nav);

  const change = (patch: Partial<SiteNavigation>) => update({ ...nav, ...patch });

  const open = () => {
    setCopied("idle");
    setConfirmReset(false);
    if (dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  };

  useEffect(() => {
    const onOpen = () => open();
    window.addEventListener("ida:edit-nav", onOpen);
    return () => window.removeEventListener("ida:edit-nav", onOpen);
  }, [nav]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopied("copied");
    } catch {
      setCopied("manual");
    }
  };

  return (
    <dialog ref={dialogRef} className="nav-editor" aria-labelledby="nav-editor-title">
        <div className="editor-shell" data-lenis-prevent>
          <header className="editor-head">
            <div>
              <p className="kicker">Menu</p>
              <h2 id="nav-editor-title">Edit navigation</h2>
            </div>
            <button type="button" onClick={() => dialogRef.current?.close()}>
              Close
            </button>
          </header>
          <div className="editor-body">
            <p className="editor-help">
              {customized
                ? "These edits are saved in this browser. Paste the TypeScript into src/config/navigation.ts to keep them in the project."
                : "The menu is loaded from src/config/navigation.ts. Changes you make here are saved in this browser."}
            </p>
            <label>
              Brand
              <input
                value={nav.brand.name}
                maxLength={48}
                autoComplete="off"
                onChange={(event) => change({ brand: { ...nav.brand, name: event.target.value } })}
              />
            </label>
            <label>
              Brand link
              <input
                value={nav.brand.href}
                maxLength={300}
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => change({ brand: { ...nav.brand, href: event.target.value } })}
              />
              <small>{describeHref(nav.brand.href)}</small>
            </label>
            <label>
              Button label
              <input
                value={nav.cta.label}
                maxLength={48}
                autoComplete="off"
                onChange={(event) => change({ cta: { ...nav.cta, label: event.target.value } })}
              />
            </label>
            <label>
              Button link
              <input
                value={nav.cta.href}
                maxLength={300}
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => change({ cta: { ...nav.cta, href: event.target.value } })}
              />
              <small>{describeHref(nav.cta.href)}</small>
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={nav.cta.hidden === true}
                onChange={(event) => change({ cta: { ...nav.cta, hidden: event.target.checked } })}
              />
              Hide the button
            </label>

            {nav.items.map((item) => (
              <LinkFields
                key={item.id}
                item={item}
                depth={0}
                onChange={(id, patch) => change({ items: patchLink(nav.items, id, patch) })}
                onMove={(id, direction) => change({ items: moveLink(nav.items, id, direction) })}
                onRemove={(id) => {
                  const items = removeLink(nav.items, id);
                  if (items.length) change({ items });
                }}
                onAddChild={(parentId) =>
                  change({
                    items: addChild(nav.items, parentId, createNavLink(collectIds(nav.items), true)),
                  })
                }
              />
            ))}

            <button
              type="button"
              className="text-button"
              onClick={() => change({ items: [...nav.items, createNavLink(collectIds(nav.items))] })}
            >
              Add a link
            </button>

            <details className="source-block">
              <summary>TypeScript for navigation.ts</summary>
              <textarea readOnly value={source} spellCheck={false} />
            </details>
          </div>
          <footer className="editor-foot">
            <button type="button" onClick={copy}>
              {copied === "copied" ? "Copied" : "Copy TypeScript"}
            </button>
            {confirmReset ? (
              <button
                type="button"
                onClick={() => {
                  reset();
                  setConfirmReset(false);
                }}
              >
                Confirm reset
              </button>
            ) : (
              <button type="button" onClick={() => setConfirmReset(true)} disabled={!customized}>
                Reset to file
              </button>
            )}
          </footer>
        </div>
      </dialog>
  );
}
