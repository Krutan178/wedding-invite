import Reveal from "./Reveal";
import { useSectionView } from "../lib/useSectionView";
import { track } from "../lib/tracking";
import { WEDDING, mapsUrl } from "../weddingConfig";

export default function Venue() {
  useSectionView("venue");

  return (
    <section id="venue" className="section venue">
      <div className="section-head">
        <Reveal as="span" className="kicker">Where the magic happens</Reveal>
        <Reveal as="h2" className="title">The Venue</Reveal>
        <Reveal as="span" className="divider">✦‿✦</Reveal>
      </div>

      <Reveal as="div" className="venue-card">
        <div className="venue-pin" aria-hidden="true">
          <span className="pin-head" /><span className="pin-tail" />
        </div>
        <h3 className="venue-name">{WEDDING.venue.name}</h3>
        <p className="venue-addr">
          {WEDDING.venue.addressLines.map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>
        <span className="orn">❋</span>
        <a
          className="gold-btn"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("directions_click")}
        >
          📍 Get Directions
        </a>
        <div className="venue-map reveal in">
          <div className="map-mock" aria-hidden="true">
            <span className="map-road road-1" />
            <span className="map-road road-2" />
            <span className="map-road road-3" />
            <span className="map-heart">❤</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
