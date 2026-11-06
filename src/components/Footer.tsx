"use client";

import { useNavigation } from "@/components/NavigationProvider";
import { SiteLink } from "@/components/SiteLink";
import { forPlacement, menuLabel } from "@/lib/navigation";
import { profile } from "@/config/content";

export function Footer() {
  const { nav } = useNavigation();
  const items = forPlacement(nav.items, "footer");

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-brand">{nav.brand.name}</p>
          <p className="footer-line">{profile.statement}</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <SiteLink href={item.href}>{menuLabel(item.label)}</SiteLink>
                {item.children?.length ? (
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <SiteLink href={child.href}>{menuLabel(child.label)}</SiteLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="kicker">Desk</p>
          <p>
            {profile.location}
            <br />
            {profile.hours}
          </p>
          <p>
            <a href="mailto:desk@example.com">desk@example.com</a>
          </p>
        </div>
      </div>
      <div className="wrap footer-colophon">
        <p>
          A demonstration site. {profile.name} is a fictional practice. The menu is set in{" "}
          <code>src/config/navigation.ts</code>.
        </p>
      </div>
    </footer>
  );
}
