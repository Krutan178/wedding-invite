import Reveal from "./Reveal";
import { useSectionView } from "../lib/useSectionView";
import { WEDDING } from "../weddingConfig";

export default function Story() {
  useSectionView("story");

  return (
    <section id="story" className="section story">
      <div className="section-head">
        <Reveal as="span" className="kicker">How we got here</Reveal>
        <Reveal as="h2" className="title">Our Story</Reveal>
        <Reveal as="span" className="divider">✦‿✦</Reveal>
      </div>

      <div className="timeline">
        {WEDDING.timeline.map((item) => (
          <Reveal as="article" className="tl-item" key={item.title}>
            <p className="tl-date">{item.date}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
