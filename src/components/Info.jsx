import Reveal from "./Reveal";
import { useSectionView } from "../lib/useSectionView";
import { WEDDING } from "../weddingConfig";

export default function Info() {
  useSectionView("info");

  return (
    <section id="info" className="section info">
      <div className="section-head">
        <Reveal as="span" className="kicker">Before you arrive</Reveal>
        <Reveal as="h2" className="title">Good to Know</Reveal>
        <Reveal as="span" className="divider">✦‿✦</Reveal>
      </div>

      <div className="info-grid">
        {WEDDING.info.map((card) => (
          <Reveal as="div" className="info-card" key={card.title}>
            <span className="ev-icon">{card.icon}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
