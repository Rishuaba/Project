import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteLink } from "@/components/SiteLink";
import { getNote, notes } from "@/config/content";

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "Note" };
  return { title: note.title, description: note.excerpt };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <article className="note">
      <header className="wrap note-hero">
        <p className="kicker">
          {note.kicker} · {note.date}
        </p>
        <h1>{note.title}</h1>
        <p className="lede">{note.excerpt}</p>
        <nav className="toc" aria-label="On this note">
          {note.sections.map((section) => (
            <SiteLink key={section.id} href={`#${section.id}`}>
              {section.heading}
            </SiteLink>
          ))}
        </nav>
      </header>
      <div className="wrap note-body">
        {note.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <SiteLink href="/#notes" className="text-link">
          All notes
        </SiteLink>
      </div>
    </article>
  );
}
