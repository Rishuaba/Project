import { BrandName } from "@/components/BrandName";
import { Reveal } from "@/components/Reveal";
import { SiteLink } from "@/components/SiteLink";
import { StudioStack } from "@/components/StudioStack";
import { VisitForm } from "@/components/VisitForm";
import { WorkList } from "@/components/WorkList";
import { YearGrid } from "@/components/YearGrid";
import { faqs, milestones, notes, places, profile, studio, work } from "@/config/content";

export function HomeView() {
  return (
    <>
      <section className="hero" id="top">
        <div className="wrap">
          <p className="kicker rise" style={{ animationDelay: "0.05s" }}>
            <BrandName />
          </p>
          <h1>
            <span className="rise" style={{ animationDelay: "0.12s" }}>
              Read Write And
            </span>
            <span className="rise" style={{ animationDelay: "0.24s" }}>
              <em>Repeat</em>
            </span>
          </h1>
          <p className="lede rise" style={{ animationDelay: "0.36s" }}>
            {profile.lede}
          </p>
          <div className="hero-actions rise" style={{ animationDelay: "0.48s" }}>
            <SiteLink href="/#work" className="cta">
              See All Posts
            </SiteLink>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="wrap">
          <Reveal>
            <div className="section-head section-head-solo">
              <h2>Latest Blog</h2>
            </div>
          </Reveal>
          <WorkList items={work} />
        </div>
      </section>

      <section className="studio" id="studio">
        <div className="wrap studio-intro">
          <Reveal>
            <p className="kicker">Studio</p>
            <h2>Three kinds of work, kept on the same desk.</h2>
          </Reveal>
        </div>
        <div className="wrap">
          <StudioStack cards={studio} />
        </div>
      </section>

      <section className="section" id="path">
        <div className="wrap">
          <Reveal>
            <p className="kicker">Path</p>
            <div className="section-head">
              <h2>The practice, from the first desk to this page.</h2>
              <p>Five marks. The work between them is in the notes.</p>
            </div>
          </Reveal>
          <ol className="timeline">
            {milestones.map((milestone, index) => (
              <li key={milestone.year}>
                <Reveal delay={index * 70}>
                  <div className="milestone">
                    <p className="year-label">{milestone.year}</p>
                    <div>
                      <h3>{milestone.title}</h3>
                      <p>{milestone.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section desk" id="desk">
        <div className="wrap">
          <Reveal>
            <p className="kicker">Desk</p>
            <div className="section-head">
              <h2>Where the work sits this week.</h2>
              <p>A sketch of the working year, drawn for the page. It is not a live feed.</p>
            </div>
          </Reveal>
          <div className="bento">
            <article>
              <p className="kicker">Place</p>
              <h3>{profile.location}</h3>
              <p>{profile.hours}</p>
            </article>
            <article className="bento-wide">
              <div className="bento-caption">
                <p className="kicker">Days at the desk</p>
                <p>Less to more</p>
              </div>
              <YearGrid />
            </article>
          </div>
        </div>
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <p key={copy}>
                {places.map((place) => (
                  <span key={`${copy}-${place}`}>{place}</span>
                ))}
              </p>
            ))}
          </div>
        </div>
        <p className="sr-only">Notes written in {places.join(", ")}.</p>
      </section>

      <section className="feature">
        <div className="wrap feature-inner">
          <div>
            <p className="kicker">Field note</p>
            <h2>A week spent only on maintenance.</h2>
            <p>The release was small. The record of it is the useful part.</p>
          </div>
        </div>
      </section>

      <section className="section" id="notes">
        <div className="wrap">
          <Reveal>
            <p className="kicker">Notes</p>
            <div className="section-head">
              <h2>Written in the same week as the work.</h2>
              <p>Three notes from the desk. They are also listed under Notes in the menu.</p>
            </div>
          </Reveal>
          <div className="note-grid">
            {notes.map((note, index) => (
              <Reveal key={note.slug} delay={index * 80}>
                <SiteLink href={`/notes/${note.slug}`} className="note-card">
                  <p className="kicker">
                    {note.kicker} · {note.date}
                  </p>
                  <h3>{note.title}</h3>
                  <p>{note.excerpt}</p>
                </SiteLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section visit" id="visit">
        <div className="wrap visit-grid">
          <div>
            <p className="kicker">Visit</p>
            <h2>Write to the desk.</h2>
            <p className="visit-copy">
              {profile.location}. {profile.hours}. A reply on a live studio site would come back by email.
              Here, the note stays in the browser.
            </p>
            <dl className="faq">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt>{faq.question}</dt>
                  <dd>{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
          <VisitForm />
        </div>
      </section>
    </>
  );
}
