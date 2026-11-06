import { SiteLink } from "@/components/SiteLink";

export default function NotFound() {
  return (
    <section className="missing wrap">
      <p className="kicker">404</p>
      <h1>This page is not on the desk.</h1>
      <p>The address does not match a note or a section.</p>
      <SiteLink href="/#top" className="cta">
        Back to the start
      </SiteLink>
    </section>
  );
}
