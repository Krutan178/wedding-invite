import Reveal from "./Reveal";
import { useSectionView } from "../lib/useSectionView";
import { WEDDING } from "../weddingConfig";

export default function Events() {
  useSectionView("events");

  return (
    <section id="events" className="section events">
      <div className="section-head">
        <Reveal as="span" className="kicker">Four days of joy</Reveal>
        <Reveal as="h2" className="title">The Celebrations</Reveal>
        <Reveal as="span" className="divider">✦‿✦</Reveal>
      </div>

      <div className="event-grid">
        {WEDDING.events.map((ev, i) => (
          <Reveal as="article" className="event-card" delay={(i % 4) * 80} key={ev.name}>
            <span className="ev-icon">{ev.icon}</span>
            <h3>{ev.name}</h3>
            <p className="ev-when">{ev.when}</p>
            <p className="ev-where">{ev.where}</p>
            <p className="ev-note">{ev.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
