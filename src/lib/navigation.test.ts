import assert from "node:assert/strict";
import test from "node:test";
import { describeHref, forPlacement, safeHref, sanitizeNavigation } from "./navigation.ts";

test("safeHref accepts site paths and http links", () => {
  assert.equal(safeHref("/#work"), "/#work");
  assert.equal(safeHref("/notes/quiet-tools"), "/notes/quiet-tools");
  assert.equal(safeHref("https://example.com/desk"), "https://example.com/desk");
});

test("safeHref rejects scriptable and protocol-relative links", () => {
  assert.equal(safeHref("javascript:alert(1)"), null);
  assert.equal(safeHref("data:text/html,hi"), null);
  assert.equal(safeHref("//evil.example"), null);
  assert.equal(safeHref("mailto:desk@example.com"), null);
});

test("sanitizeNavigation keeps a valid menu and drops a bad item", () => {
  const clean = sanitizeNavigation({
    brand: { name: "Ida", href: "/#top" },
    cta: { label: "Write", href: "/#visit" },
    items: [
      { id: "work", label: "Work", href: "/#work" },
      { id: "bad id", label: "Nope", href: "/#nope" },
      {
        id: "notes",
        label: "Notes",
        href: "/#notes",
        children: [{ id: "quiet-tools", label: "Quiet tools", href: "/notes/quiet-tools", note: "Interfaces" }],
      },
    ],
  });

  assert.ok(clean);
  assert.equal(clean?.items.length, 2);
  assert.equal(clean?.items[1]?.children?.[0]?.label, "Quiet tools");
});

test("forPlacement honors hidden links and header or footer placement", () => {
  const items = forPlacement(
    [
      { id: "work", label: "Work", href: "/#work" },
      { id: "desk", label: "Desk", href: "/#desk", hidden: true },
      { id: "visit", label: "Visit", href: "/#visit", placement: "footer" },
    ],
    "header",
  );
  assert.deepEqual(
    items.map((item) => item.id),
    ["work"],
  );
});

test("describeHref explains a section link", () => {
  assert.equal(describeHref("/#studio"), "Section on this site");
  assert.equal(describeHref("javascript:alert(1)"), "Use /#section, /page, or https://");
});
