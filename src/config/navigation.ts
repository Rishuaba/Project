/**
 * Edit this file to change the menu.
 *
 * The header and the footer both read from here. Reload the page after a change.
 *
 * href examples:
 *   "/#work"            a section on the home page
 *   "/notes/quiet-tools" a page on this site
 *   "https://example.com" another site
 *
 * placement:
 *   leave it out to show the link in the header and the footer
 *   "header" or "footer" to show it in only one of them
 *
 * hidden: true keeps the link in this file and hides it on the page.
 * children: one level of dropdown links. Notes are a good place to try this.
 */
export type NavPlacement = "header" | "footer" | "both";

export type NavLink = {
  /** Stable id used when reordering. Letters, numbers, and hyphens. */
  id: string;
  label: string;
  href: string;
  placement?: NavPlacement;
  hidden?: boolean;
  /** Shown under the label inside a dropdown. */
  note?: string;
  children?: NavLink[];
};

export type SiteNavigation = {
  brand: {
    name: string;
    href: string;
  };
  cta: {
    label: string;
    href: string;
    hidden?: boolean;
  };
  items: NavLink[];
};

export const navigation: SiteNavigation = {
  brand: {
    name: "Sharukh",
    href: "/#top",
  },
  cta: {
    label: "Start a project",
    href: "/#visit",
  },
  items: [
    { id: "work", label: "Work", href: "/#work" },
    { id: "studio", label: "Studio", href: "/#studio" },
    {
      id: "desk",
      label: "Desk",
      href: "/#desk",
      hidden: true,
    },
    { id: "path", label: "Path", href: "/#path" },
    {
      id: "notes",
      label: "Notes",
      href: "/#notes",
      children: [
        {
          id: "quiet-tools",
          label: "Quiet tools",
          href: "/notes/quiet-tools",
          note: "Interfaces",
        },
        {
          id: "shipping-alone",
          label: "Shipping alone",
          href: "/notes/shipping-alone",
          note: "Practice",
        },
        {
          id: "maintenance-week",
          label: "A maintenance week",
          href: "/notes/maintenance-week",
          note: "Upkeep",
        },
      ],
    },
    { id: "visit", label: "Visit", href: "/#visit" },
  ],
};
